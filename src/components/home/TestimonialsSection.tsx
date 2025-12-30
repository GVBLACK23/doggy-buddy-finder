import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    location: "São Paulo, SP",
    rating: 5,
    text: "Encontrei um instrutor incrível pelo Dirija.ja! Tirei minha CNH de primeira e o processo foi super tranquilo.",
    avatar: "M",
  },
  {
    name: "João Santos",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "A plataforma é muito fácil de usar. Em menos de uma semana já estava fazendo aulas com um instrutor excelente.",
    avatar: "J",
  },
  {
    name: "Ana Oliveira",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "Recomendo muito! O instrutor que encontrei tinha carro para a prova e me ajudou muito na preparação.",
    avatar: "A",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            O que nossos <span className="text-secondary">alunos</span> dizem
          </h2>
          <p className="text-muted-foreground">
            Milhares de pessoas já conquistaram sua CNH com a ajuda do Dirija.ja
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-display font-bold text-lg">
                  {testimonial.avatar}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
