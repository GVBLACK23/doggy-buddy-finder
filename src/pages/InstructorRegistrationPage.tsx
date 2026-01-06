import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { Car, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CPFInput from "@/components/instructor/CPFInput";
import PhotoUpload from "@/components/instructor/PhotoUpload";

const registrationSchema = z.object({
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  birthDate: z.string().refine((date) => {
    const birth = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    return age >= 21;
  }, "Você deve ter pelo menos 21 anos"),
  yearsOfExperience: z.string().min(1, "Selecione o tempo de experiência"),
  instructorLicenseNumber: z.string().length(6, "Registro deve ter 6 dígitos"),
  hasOwnVehicle: z.enum(["yes", "no"]),
  transmissionType: z.enum(["manual", "automatic", "both"]).optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const InstructorRegistrationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields
  const [cpf, setCpf] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [instructorLicenseNumber, setInstructorLicenseNumber] = useState("");
  const [licensePhoto, setLicensePhoto] = useState<File | null>(null);
  const [hasOwnVehicle, setHasOwnVehicle] = useState<"yes" | "no">("no");
  const [transmissionType, setTransmissionType] = useState<"manual" | "automatic" | "both">("manual");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const uploadPhoto = async (file: File, path: string): Promise<string | null> => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      const validationResult = registrationSchema.safeParse({
        cpf,
        fullName,
        birthDate,
        yearsOfExperience,
        instructorLicenseNumber,
        hasOwnVehicle,
        transmissionType: hasOwnVehicle === "yes" ? transmissionType : undefined,
        email,
        password,
        confirmPassword,
      });

      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast({
          title: "Erro de validação",
          description: firstError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) {
        toast({
          title: "Erro ao criar conta",
          description: authError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        toast({
          title: "Erro",
          description: "Não foi possível criar o usuário",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const userId = authData.user.id;

      // Upload photos
      let profilePhotoUrl = null;
      let licensePhotoUrl = null;

      if (profilePhoto) {
        profilePhotoUrl = await uploadPhoto(
          profilePhoto,
          `${userId}/profile-photo.${profilePhoto.name.split(".").pop()}`
        );
      }

      if (licensePhoto) {
        licensePhotoUrl = await uploadPhoto(
          licensePhoto,
          `${userId}/license-photo.${licensePhoto.name.split(".").pop()}`
        );
      }

      // Insert instructor registration
      const { error: registrationError } = await supabase
        .from("instructor_registrations")
        .insert({
          user_id: userId,
          cpf: cpf.replace(/\D/g, ""),
          full_name: fullName,
          birth_date: birthDate,
          profile_photo_url: profilePhotoUrl,
          years_of_experience: yearsOfExperience,
          instructor_license_number: instructorLicenseNumber,
          license_photo_url: licensePhotoUrl,
          has_own_vehicle: hasOwnVehicle === "yes",
          transmission_type: hasOwnVehicle === "yes" ? transmissionType : null,
        });

      if (registrationError) {
        console.error("Registration error:", registrationError);
        toast({
          title: "Erro ao salvar cadastro",
          description: registrationError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Insert user role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: userId,
          role: "instructor",
        });

      if (roleError) {
        console.error("Role error:", roleError);
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Seu cadastro está em análise. Você receberá um email quando for aprovado.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro inesperado",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cadastro de Instrutor | Dirija.ja</title>
        <meta name="description" content="Cadastre-se como instrutor de direção no Dirija.ja e comece a dar aulas" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        {/* Header */}
        <header className="p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-secondary">
              Dirija<span className="text-primary">.ja</span>
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/selecionar-perfil")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-secondary mb-2">
              Cadastro de Instrutor
            </h1>
            <p className="text-muted-foreground">
              Preencha seus dados para se cadastrar como instrutor
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Data Section */}
            <section className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-secondary mb-6">
                Dados Pessoais
              </h2>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <CPFInput
                    id="cpf"
                    value={cpf}
                    onChange={setCpf}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>

                <PhotoUpload
                  label="Foto de Perfil"
                  description="Esta foto será exibida no seu perfil público"
                  value={profilePhoto}
                  onChange={setProfilePhoto}
                />
              </div>
            </section>

            {/* Professional Data Section */}
            <section className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-secondary mb-6">
                Dados Profissionais
              </h2>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="yearsOfExperience">Tempo de Profissão</Label>
                  <Select value={yearsOfExperience} onValueChange={setYearsOfExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-1">Menos de 1 ano</SelectItem>
                      <SelectItem value="1-3">1 a 3 anos</SelectItem>
                      <SelectItem value="3-5">3 a 5 anos</SelectItem>
                      <SelectItem value="5-10">5 a 10 anos</SelectItem>
                      <SelectItem value="more-than-10">Mais de 10 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instructorLicenseNumber">
                    Registro de Instrutor (6 dígitos)
                  </Label>
                  <Input
                    id="instructorLicenseNumber"
                    value={instructorLicenseNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setInstructorLicenseNumber(value);
                    }}
                    placeholder="000000"
                    maxLength={6}
                    inputMode="numeric"
                    required
                  />
                </div>

                <PhotoUpload
                  label="Foto da Carteira de Instrutor"
                  description="Envie uma foto legível da sua carteira de instrutor"
                  value={licensePhoto}
                  onChange={setLicensePhoto}
                />
              </div>
            </section>

            {/* Vehicle Section */}
            <section className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-secondary mb-6">
                Veículo
              </h2>
              
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label>Possui veículo próprio?</Label>
                  <RadioGroup
                    value={hasOwnVehicle}
                    onValueChange={(value) => setHasOwnVehicle(value as "yes" | "no")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="vehicle-yes" />
                      <Label htmlFor="vehicle-yes" className="cursor-pointer">
                        Sim
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="vehicle-no" />
                      <Label htmlFor="vehicle-no" className="cursor-pointer">
                        Não
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {hasOwnVehicle === "yes" && (
                  <div className="grid gap-3">
                    <Label>Tipo de câmbio</Label>
                    <RadioGroup
                      value={transmissionType}
                      onValueChange={(value) =>
                        setTransmissionType(value as "manual" | "automatic" | "both")
                      }
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manual" id="transmission-manual" />
                        <Label htmlFor="transmission-manual" className="cursor-pointer">
                          Manual
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="automatic" id="transmission-automatic" />
                        <Label htmlFor="transmission-automatic" className="cursor-pointer">
                          Automático
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="transmission-both" />
                        <Label htmlFor="transmission-both" className="cursor-pointer">
                          Ambos
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            </section>

            {/* Credentials Section */}
            <section className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-secondary mb-6">
                Credenciais de Acesso
              </h2>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Digite a senha novamente"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                "Finalizar Cadastro"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Ao se cadastrar, você concorda com nossos{" "}
              <a href="#" className="text-primary hover:underline">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary hover:underline">
                Política de Privacidade
              </a>
            </p>
          </form>
        </main>
      </div>
    </>
  );
};

export default InstructorRegistrationPage;
