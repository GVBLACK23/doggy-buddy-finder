import { Search, MapPin, Calendar, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (categoria) params.set("categoria", categoria);
    if (localizacao) params.set("localizacao", localizacao);
    navigate(`/buscar?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Car className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                +500 instrutores verificados
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Encontre o instrutor{" "}
              <span className="text-primary">ideal</span> para sua{" "}
              <span className="text-secondary">primeira habilitação</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Conectamos você com instrutores de direção qualificados e 
              experientes perto de você. Aprenda a dirigir com confiança!
            </p>

            {/* Search Box */}
            <div className="bg-card p-4 md:p-6 rounded-2xl shadow-medium space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Categoria CNH
                  </label>
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Categoria A (Moto)</SelectItem>
                      <SelectItem value="B">Categoria B (Carro)</SelectItem>
                      <SelectItem value="AB">Categoria AB</SelectItem>
                      <SelectItem value="C">Categoria C (Caminhão)</SelectItem>
                      <SelectItem value="D">Categoria D (Ônibus)</SelectItem>
                      <SelectItem value="E">Categoria E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Localização
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Cidade ou bairro"
                      className="pl-10 h-12"
                      value={localizacao}
                      onChange={(e) => setLocalizacao(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Disponibilidade
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full h-12 text-base font-semibold"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar Instrutores
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-light" />
                Instrutores verificados
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Pagamento seguro
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                Suporte 24/7
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full animate-float" />
              <div className="absolute inset-8 bg-gradient-to-tl from-primary/30 via-transparent to-transparent rounded-full" />
              
              {/* Main Circle */}
              <div className="absolute inset-16 bg-secondary rounded-full flex items-center justify-center shadow-glow">
                <Car className="w-24 h-24 text-primary" />
              </div>

              {/* Floating Cards */}
              <div className="absolute top-12 right-0 bg-card p-4 rounded-xl shadow-medium animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">4.9/5</p>
                    <p className="text-xs text-muted-foreground">+2.000 avaliações</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 left-0 bg-card p-4 rounded-xl shadow-medium animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">🎓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">+5.000</p>
                    <p className="text-xs text-muted-foreground">Alunos aprovados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
