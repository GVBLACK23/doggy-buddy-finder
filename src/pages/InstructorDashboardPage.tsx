import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Car,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  LogOut,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data - seria substituído por dados reais do Supabase
const mockFinancialData = {
  weekEarnings: 1250.0,
  todayLessons: 3,
  monthEarnings: 4800.0,
  totalStudents: 12,
};

const mockSchedule = [
  { time: "08:00", status: "occupied", student: "Maria Silva" },
  { time: "09:00", status: "occupied", student: "João Pedro" },
  { time: "10:00", status: "free" },
  { time: "11:00", status: "free" },
  { time: "14:00", status: "occupied", student: "Ana Clara" },
  { time: "15:00", status: "free" },
  { time: "16:00", status: "free" },
  { time: "17:00", status: "free" },
];

const mockUpcomingLessons = [
  {
    id: 1,
    student: {
      name: "Maria Silva",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      phone: "5511999998888",
    },
    time: "08:00",
    location: "Rua das Flores, 123 - Centro",
    type: "Habilitação",
  },
  {
    id: 2,
    student: {
      name: "João Pedro",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      phone: "5511999997777",
    },
    time: "09:00",
    location: "Av. Brasil, 456 - Jardins",
    type: "Reciclagem",
  },
  {
    id: 3,
    student: {
      name: "Ana Clara",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      phone: "5511999996666",
    },
    time: "14:00",
    location: "Praça Central, 789 - Vila Nova",
    type: "Medo de dirigir",
  },
];

const InstructorDashboardPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedDate] = useState(new Date());

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const openWhatsApp = (phone: string, studentName: string) => {
    const message = encodeURIComponent(
      `Olá ${studentName}! Sou seu instrutor do Dirija.ja. Estou entrando em contato sobre nossa aula de hoje.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard do Instrutor | Dirija.ja</title>
        <meta
          name="description"
          content="Gerencie suas aulas, acompanhe seus ganhos e veja sua agenda no painel do instrutor."
        />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-secondary text-secondary-foreground sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl font-display font-bold">
                    Dirija<span className="text-primary">.ja</span>
                  </span>
                  <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary text-xs">
                    Instrutor
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-secondary-foreground/70 hidden md:block">
                  Olá, {user?.user_metadata?.full_name || "Instrutor"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-secondary-foreground/70 hover:text-secondary-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Cards de Resumo Financeiro */}
          <section className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Resumo Financeiro
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary to-yellow-dark text-primary-foreground">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Ganhos da Semana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl lg:text-3xl font-bold">
                    {formatCurrency(mockFinancialData.weekEarnings)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary to-green-darker text-secondary-foreground">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Aulas Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl lg:text-3xl font-bold">
                    {mockFinancialData.todayLessons}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Ganhos do Mês
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl lg:text-3xl font-bold text-foreground">
                    {formatCurrency(mockFinancialData.monthEarnings)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Alunos Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl lg:text-3xl font-bold text-foreground">
                    {mockFinancialData.totalStudents}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Agenda Visual */}
            <section className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Agenda de Hoje
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockSchedule.map((slot, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          slot.status === "occupied"
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-muted/50 border border-transparent"
                        }`}
                      >
                        <span className="font-mono text-sm font-medium w-12">
                          {slot.time}
                        </span>
                        {slot.status === "occupied" ? (
                          <span className="text-sm font-medium text-foreground">
                            {slot.student}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Disponível
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Próximas Aulas */}
            <section className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Próximas Aulas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUpcomingLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border hover:border-primary/30 transition-colors"
                      >
                        <Avatar className="w-14 h-14 border-2 border-primary/20">
                          <AvatarImage src={lesson.student.photo} />
                          <AvatarFallback>
                            {lesson.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {lesson.student.name}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {lesson.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {lesson.time}
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{lesson.location}</span>
                            </span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white flex-shrink-0"
                          onClick={() =>
                            openWhatsApp(lesson.student.phone, lesson.student.name)
                          }
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default InstructorDashboardPage;
