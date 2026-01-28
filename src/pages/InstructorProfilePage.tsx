import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Star,
  MapPin,
  Shield,
  Car,
  Clock,
  Award,
  MessageSquare,
  ChevronLeft,
  Check,
  Sparkles,
  Snowflake,
  Gauge,
  Settings,
  CheckCircle,
} from "lucide-react";
import { Helmet } from "react-helmet";
import PraiseTags from "@/components/instructor/PraiseTags";
import TrustBadges from "@/components/instructor/TrustBadges";

// Mock data - will be replaced with real data
const mockInstructor = {
  id: "1",
  name: "Carlos Oliveira",
  location: "São Paulo, SP - Pinheiros",
  rating: 4.9,
  reviewCount: 127,
  pricePerHour: 85,
  trialPrice: 49,
  categories: ["B"],
  transmission: "Manual",
  hasCarForTest: true,
  verified: true,
  avatar: "CO",
  experience: 8,
  bio: "Instrutor de direção há 8 anos, com mais de 500 alunos aprovados. Especializado em ensinar de forma calma e paciente, ideal para quem está começando ou tem medo de dirigir.",
  vehicles: [
    { 
      model: "Chevrolet Onix 2023", 
      type: "Manual",
      features: { airConditioning: true, powerSteering: true, dualCommand: true, inspected: true }
    },
    { 
      model: "Volkswagen Polo 2022", 
      type: "Automático",
      features: { airConditioning: true, powerSteering: true, dualCommand: true, inspected: true }
    },
  ],
  packages: [
    { name: "Aula Experimental", hours: 1, price: 49, isTrialLesson: true },
    { name: "Aula avulsa", hours: 1, price: 85 },
    { name: "Pacote 5 aulas", hours: 5, price: 380, discount: 10 },
    { name: "Pacote 10 aulas", hours: 10, price: 680, discount: 20 },
  ],
  praiseTags: ["Muita Paciência", "Pontual", "Deixa Calmo", "Carro Limpo", "Didático"],
  reviews: [
    {
      id: "1",
      name: "Maria Silva",
      rating: 5,
      date: "2024-01-15",
      text: "Excelente instrutor! Muito paciente e didático. Tirei minha CNH de primeira graças ao Carlos.",
    },
    {
      id: "2",
      name: "João Santos",
      rating: 5,
      date: "2024-01-10",
      text: "Super recomendo! O carro dele é ótimo e ele tem uma didática muito boa.",
    },
    {
      id: "3",
      name: "Ana Oliveira",
      rating: 4,
      date: "2024-01-05",
      text: "Bom instrutor, pontual e profissional. Aprovada no exame prático!",
    },
  ],
};

const InstructorProfilePage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedPackage, setSelectedPackage] = useState(0);

  // In a real app, fetch instructor data based on id
  const instructor = mockInstructor;

  return (
    <>
      <Helmet>
        <title>{instructor.name} - Instrutor de Direção | Dirija.ja</title>
        <meta
          name="description"
          content={`${instructor.name} - Instrutor de direção em ${instructor.location}. ${instructor.experience} anos de experiência. Avaliação ${instructor.rating}/5.`}
        />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <Link
              to="/buscar"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar para busca
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Trust Badges - Verification Section */}
                <div className="bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-display font-semibold text-sm">Verificação Dirija.ja</span>
                  </div>
                  <TrustBadges />
                </div>

                {/* Header Card */}
                <div className="bg-card p-6 md:p-8 rounded-2xl border border-border">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-28 h-28 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center font-display font-bold text-4xl">
                        {instructor.avatar}
                      </div>
                      {instructor.verified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-light rounded-full flex items-center justify-center shadow-lg">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <h1 className="text-2xl md:text-3xl font-display font-bold">
                            {instructor.name}
                          </h1>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <MapPin className="w-4 h-4" />
                            {instructor.location}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                            <Star className="w-5 h-5 fill-primary text-primary" />
                            <span className="font-bold">{instructor.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({instructor.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Praise Tags */}
                      <div className="mt-4">
                        <PraiseTags tags={instructor.praiseTags} />
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {instructor.experience} anos de experiência
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">500+ alunos aprovados</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {instructor.categories.map((cat) => (
                          <Badge key={cat} variant="secondary">
                            CNH {cat}
                          </Badge>
                        ))}
                        <Badge variant="outline">{instructor.transmission}</Badge>
                        {instructor.hasCarForTest && (
                          <Badge
                            variant="outline"
                            className="border-green-light text-green-light"
                          >
                            <Car className="w-3 h-3 mr-1" />
                            Carro para prova
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="sobre" className="bg-card rounded-2xl border border-border">
                  <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
                    <TabsTrigger
                      value="sobre"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Sobre
                    </TabsTrigger>
                    <TabsTrigger
                      value="veiculos"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Veículos
                    </TabsTrigger>
                    <TabsTrigger
                      value="avaliacoes"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Avaliações
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="sobre" className="p-6">
                    <h3 className="font-display font-semibold text-lg mb-3">
                      Sobre mim
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {instructor.bio}
                    </p>
                  </TabsContent>

                  <TabsContent value="veiculos" className="p-6">
                    <h3 className="font-display font-semibold text-lg mb-4">
                      Veículos disponíveis
                    </h3>
                    <div className="grid gap-4">
                      {instructor.vehicles.map((vehicle, index) => (
                        <div
                          key={index}
                          className="p-4 bg-muted/50 rounded-xl border border-border"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                              <Car className="w-6 h-6 text-secondary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{vehicle.model}</p>
                                {vehicle.features.inspected && (
                                  <div className="flex items-center gap-1 bg-green-light/10 text-green-light px-2 py-0.5 rounded-full text-xs font-medium">
                                    <CheckCircle className="w-3 h-3" />
                                    Vistoriado
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Câmbio {vehicle.type}
                              </p>
                            </div>
                          </div>
                          {/* Vehicle Features */}
                          <div className="flex flex-wrap gap-2">
                            {vehicle.features.airConditioning && (
                              <Badge variant="outline" className="text-xs">
                                <Snowflake className="w-3 h-3 mr-1" />
                                Ar Condicionado
                              </Badge>
                            )}
                            {vehicle.features.powerSteering && (
                              <Badge variant="outline" className="text-xs">
                                <Gauge className="w-3 h-3 mr-1" />
                                Dir. Hidráulica
                              </Badge>
                            )}
                            {vehicle.features.dualCommand && (
                              <Badge variant="outline" className="text-xs">
                                <Settings className="w-3 h-3 mr-1" />
                                Duplo Comando
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="avaliacoes" className="p-6">
                    <h3 className="font-display font-semibold text-lg mb-4">
                      Avaliações dos alunos
                    </h3>
                    <div className="space-y-4">
                      {instructor.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 bg-muted/50 rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-primary text-primary"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {review.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar - Booking */}
              <div className="space-y-6">
                {/* Pricing Card */}
                <div className="bg-card p-6 rounded-2xl border border-border sticky top-24">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-display font-bold text-primary">
                      R$ {instructor.pricePerHour}
                    </p>
                    <p className="text-sm text-muted-foreground">por aula</p>
                  </div>

                  {/* Packages */}
                  <div className="space-y-3 mb-6">
                    <p className="font-medium text-sm">Escolha um pacote:</p>
                    {instructor.packages.map((pkg, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPackage(index)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all relative ${
                          pkg.isTrialLesson
                            ? selectedPackage === index
                              ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                              : "border-primary/50 bg-primary/5 hover:border-primary"
                            : selectedPackage === index
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                        }`}
                      >
                        {pkg.isTrialLesson && (
                          <div className="absolute -top-2 left-4 bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Recomendado
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${pkg.isTrialLesson ? "text-primary" : ""}`}>
                              {pkg.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {pkg.hours} {pkg.hours === 1 ? "hora" : "horas"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${pkg.isTrialLesson ? "text-primary" : ""}`}>
                              R$ {pkg.price}
                            </p>
                            {pkg.discount && (
                              <p className="text-xs text-green-light">
                                -{pkg.discount}%
                              </p>
                            )}
                            {pkg.isTrialLesson && (
                              <p className="text-xs text-green-light font-medium">
                                Preço especial
                              </p>
                            )}
                          </div>
                        </div>
                        {selectedPackage === index && (
                          <Check className="absolute top-4 right-4 w-5 h-5 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Calendar */}
                  <div className="mb-6">
                    <p className="font-medium text-sm mb-3">
                      Selecione uma data:
                    </p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-xl border border-border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>

                  <Button className="w-full h-12 text-base font-semibold">
                    Agendar Aula
                  </Button>

                  {/* Guarantee Micro-copy */}
                  <div className="mt-4 p-3 bg-muted/50 rounded-xl border border-border">
                    <div className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-green-light flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">Garantia de Química:</span>{" "}
                        Se não se adaptar na 1ª aula, trocamos seu instrutor gratuitamente.
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-3">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enviar mensagem
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InstructorProfilePage;
