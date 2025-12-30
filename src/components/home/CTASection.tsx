import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary text-secondary-foreground overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
              Seja um instrutor
            </span>

            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              Você é instrutor de direção?{" "}
              <span className="text-primary">Cadastre-se gratuitamente!</span>
            </h2>

            <p className="text-secondary-foreground/70 text-lg">
              Expanda sua carteira de alunos e aumente sua renda. Milhares de 
              pessoas estão procurando instrutores como você.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Mais alunos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Agenda flexível</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Pagamento seguro</span>
              </div>
            </div>

            <Link to="/seja-instrutor">
              <Button size="lg" className="group">
                Quero me cadastrar
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-secondary-foreground/5 backdrop-blur-sm p-6 rounded-2xl border border-secondary-foreground/10">
              <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                500+
              </p>
              <p className="text-secondary-foreground/70">
                Instrutores ativos
              </p>
            </div>
            <div className="bg-secondary-foreground/5 backdrop-blur-sm p-6 rounded-2xl border border-secondary-foreground/10">
              <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                5.000+
              </p>
              <p className="text-secondary-foreground/70">
                Alunos aprovados
              </p>
            </div>
            <div className="bg-secondary-foreground/5 backdrop-blur-sm p-6 rounded-2xl border border-secondary-foreground/10">
              <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                4.9
              </p>
              <p className="text-secondary-foreground/70">
                Avaliação média
              </p>
            </div>
            <div className="bg-secondary-foreground/5 backdrop-blur-sm p-6 rounded-2xl border border-secondary-foreground/10">
              <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                50+
              </p>
              <p className="text-secondary-foreground/70">
                Cidades atendidas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
