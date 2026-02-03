import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { z } from "zod";
import {
  Car,
  ArrowLeft,
  Loader2,
  User,
  Lock,
  DollarSign,
  MapPin,
  Phone,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PhotoUpload from "@/components/instructor/PhotoUpload";
import CEPInput, { AddressData } from "@/components/instructor/CEPInput";
import WhatsAppInput from "@/components/instructor/WhatsAppInput";

const priceSchema = z.object({
  priceSingle: z.number().min(0, "Preço deve ser maior que 0"),
  pricePackage: z.number().min(0, "Preço deve ser maior que 0"),
});

const InstructorSettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile data
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string | null>(null);
  
  // Contact data
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  // Location data
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  
  // Financial data
  const [priceSingle, setPriceSingle] = useState("");
  const [pricePackage, setPricePackage] = useState("");
  
  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    if (user) {
      loadInstructorData();
    }
  }, [user]);

  const loadInstructorData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("instructor_registrations")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setFullName(data.full_name || "");
        setBio(data.bio || "");
        setCurrentPhotoUrl(data.profile_photo_url);
        setWhatsapp(data.whatsapp || "");
        setCep(data.cep || "");
        setAddress(data.address || "");
        setPriceSingle(data.price_single?.toString() || "80");
        setPricePackage(data.price_package?.toString() || "700");
      }
      
      setEmail(user.email || "");
    } catch (error) {
      console.error("Error loading instructor data:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressFound = (addressData: AddressData) => {
    setAddress(addressData.fullAddress);
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    if (!user) return null;
    
    const path = `${user.id}/profile-photo-${Date.now()}.${file.name.split(".").pop()}`;
    const { data, error } = await supabase.storage
      .from("instructor-documents")
      .upload(path, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("instructor-documents")
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      let photoUrl = currentPhotoUrl;
      
      if (profilePhoto) {
        photoUrl = await uploadPhoto(profilePhoto);
      }

      const { error } = await supabase
        .from("instructor_registrations")
        .update({
          full_name: fullName,
          bio,
          profile_photo_url: photoUrl,
          whatsapp,
          cep: cep.replace(/\D/g, ""),
          address,
          price_single: parseFloat(priceSingle) || 80,
          price_package: parseFloat(pricePackage) || 700,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Dados salvos!",
        description: "Seu perfil foi atualizado com sucesso.",
      });

      setCurrentPhotoUrl(photoUrl);
      setProfilePhoto(null);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Senha alterada!",
        description: "Sua senha foi atualizada com sucesso.",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Erro ao alterar senha",
        description: "Não foi possível alterar sua senha. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangeEmail = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email,
      });

      if (error) throw error;

      toast({
        title: "Email atualizado!",
        description: "Um email de confirmação foi enviado para o novo endereço.",
      });
    } catch (error) {
      console.error("Error changing email:", error);
      toast({
        title: "Erro ao alterar email",
        description: "Não foi possível alterar seu email. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Meus Dados | Dirija.ja</title>
        <meta name="description" content="Gerencie seus dados de perfil, preços e informações de contato." />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-secondary text-secondary-foreground sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/dashboard-instrutor")}
                  className="text-secondary-foreground/70 hover:text-secondary-foreground"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-bold">
                  Dirija<span className="text-primary">.ja</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-2xl font-display font-bold text-foreground mb-6">
            Meus Dados
          </h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4 hidden sm:block" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="contact" className="gap-2">
                <Phone className="w-4 h-4 hidden sm:block" />
                Contato
              </TabsTrigger>
              <TabsTrigger value="financial" className="gap-2">
                <DollarSign className="w-4 h-4 hidden sm:block" />
                Preços
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Lock className="w-4 h-4 hidden sm:block" />
                Segurança
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Informações do Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    {currentPhotoUrl && !profilePhoto && (
                      <img
                        src={currentPhotoUrl}
                        alt="Foto de perfil"
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                      />
                    )}
                    <PhotoUpload
                      label="Atualizar Foto de Perfil"
                      description="Esta foto será exibida no seu perfil público"
                      value={profilePhoto}
                      onChange={setProfilePhoto}
                    />
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="bio">Sobre Você</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Conte um pouco sobre sua experiência e método de ensino..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Informações de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <WhatsAppInput
                        id="whatsapp"
                        value={whatsapp}
                        onChange={setWhatsapp}
                      />
                      <p className="text-sm text-muted-foreground">
                        Este número será usado para os alunos entrarem em contato
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cep">CEP</Label>
                      <CEPInput
                        id="cep"
                        value={cep}
                        onChange={setCep}
                        onAddressFound={handleAddressFound}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="address">Endereço Completo</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Endereço será preenchido automaticamente pelo CEP"
                          className="pl-10"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Este endereço é usado para calcular a proximidade com alunos
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Preços das Aulas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="priceSingle">Preço da Aula Avulsa (R$)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          R$
                        </span>
                        <Input
                          id="priceSingle"
                          type="number"
                          value={priceSingle}
                          onChange={(e) => setPriceSingle(e.target.value)}
                          placeholder="80.00"
                          className="pl-10"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Este valor será exibido no seu card público
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="pricePackage">Preço do Pacote 10 Aulas (R$)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          R$
                        </span>
                        <Input
                          id="pricePackage"
                          type="number"
                          value={pricePackage}
                          onChange={(e) => setPricePackage(e.target.value)}
                          placeholder="700.00"
                          className="pl-10"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Destaque para alunos que buscam pacotes com desconto
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Dica:</strong> Oferecer um desconto no pacote 
                      de 10 aulas aumenta a conversão em até 40%!
                    </p>
                  </div>

                  <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Salvar Preços
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                {/* Email Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alterar Email</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Novo Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <Button onClick={handleChangeEmail} disabled={isSaving} variant="outline" className="w-full">
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      Atualizar Email
                    </Button>
                  </CardContent>
                </Card>

                {/* Password Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lock className="w-5 h-5 text-primary" />
                      Alterar Senha
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPasswords ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() => setShowPasswords(!showPasswords)}
                          >
                            {showPasswords ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <Input
                          id="confirmPassword"
                          type={showPasswords ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Digite a nova senha novamente"
                        />
                      </div>
                    </div>

                    <Button onClick={handleChangePassword} disabled={isSaving} variant="outline" className="w-full">
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      Alterar Senha
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default InstructorSettingsPage;
