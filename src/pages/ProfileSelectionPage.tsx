import { useNavigate } from "react-router-dom";
import { Car, GraduationCap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ProfileSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Car className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-secondary">
            Dirija<span className="text-primary">.ja</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
            Como você quer usar o Dirija.ja?
          </h1>
          <p className="text-muted-foreground text-lg">
            Selecione seu perfil para continuar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
          {/* Student Card */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => navigate("/auth")}
            className="group relative bg-card border-2 border-primary/20 hover:border-primary rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-6 h-6 text-primary" />
            </div>
            
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-2xl font-display font-bold text-secondary mb-2">
              Aluno
            </h2>
            <p className="text-muted-foreground">
              Quero aprender a dirigir e encontrar o melhor instrutor para mim
            </p>
          </motion.button>

          {/* Instructor Card */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => navigate("/cadastro-instrutor")}
            className="group relative bg-secondary text-secondary-foreground rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-6 h-6 text-primary" />
            </div>
            
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
              <Car className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Instrutor
            </h2>
            <p className="text-white/70">
              Sou instrutor de direção e quero oferecer minhas aulas
            </p>
          </motion.button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-muted-foreground text-sm">
        <p>
          Já tem uma conta?{" "}
          <button 
            onClick={() => navigate("/auth")} 
            className="text-primary hover:underline font-medium"
          >
            Fazer login
          </button>
        </p>
      </footer>
    </div>
  );
};

export default ProfileSelectionPage;
