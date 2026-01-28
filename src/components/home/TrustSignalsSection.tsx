import { Shield, FileCheck, Car, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  {
    icon: FileCheck,
    title: "CNH Checada",
    description: "Verificamos a habilitação de todos os instrutores",
  },
  {
    icon: UserCheck,
    title: "Antecedentes Verificados",
    description: "Checagem de antecedentes criminais",
  },
  {
    icon: Car,
    title: "Documento do Carro em Dia",
    description: "Veículos com documentação regularizada",
  },
];

const TrustSignalsSection = () => {
  return (
    <section className="py-16 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-4">
            <Shield className="w-5 h-5" />
            <span className="font-semibold text-sm">Verificação Dirija.ja</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Sua segurança é nossa prioridade
          </h2>
          <p className="text-secondary-foreground/70 mt-2 max-w-xl mx-auto">
            Todos os instrutores passam por um rigoroso processo de verificação
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary-foreground/5 rounded-2xl p-6 text-center border border-secondary-foreground/10"
            >
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-5 h-5 bg-green-light rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg">{item.title}</h3>
              </div>
              <p className="text-secondary-foreground/70 text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
