import { Search, Calendar, Car, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Busque um instrutor",
    description: "Pesquise instrutores por localização, categoria de CNH e disponibilidade.",
  },
  {
    icon: Calendar,
    title: "Agende sua aula",
    description: "Escolha o melhor dia e horário para sua aula de direção.",
  },
  {
    icon: Car,
    title: "Aprenda a dirigir",
    description: "Faça suas aulas práticas com um instrutor qualificado e experiente.",
  },
  {
    icon: CheckCircle,
    title: "Conquiste sua CNH",
    description: "Prepare-se para o exame prático e conquiste sua carteira de motorista!",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-secondary text-sm font-medium rounded-full mb-4">
            Simples e rápido
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Como funciona o <span className="text-primary">Dirija.ja</span>
          </h2>
          <p className="text-muted-foreground">
            Em poucos passos você encontra o instrutor ideal e começa suas aulas de direção
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-medium transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-glow">
                  {index + 1}
                </div>

                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <step.icon className="w-7 h-7 text-secondary group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-lg font-display font-semibold mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
