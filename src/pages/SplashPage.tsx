import { useNavigate } from "react-router-dom";
import { Car, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lado do Aluno - Amarelo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 bg-primary flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-primary-foreground rounded-full" />
          <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-primary-foreground rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-primary-foreground rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-8 bg-primary-foreground/10 rounded-full flex items-center justify-center"
          >
            <GraduationCap className="w-12 h-12 lg:w-16 lg:h-16 text-primary-foreground" />
          </motion.div>

          <h1 className="text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4">
            Sou Aluno
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Encontre o instrutor ideal e conquiste sua CNH com confiança
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/auth?mode=signup&role=student")}
            className="group inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Quero aprender
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="mt-6 text-primary-foreground/70">
            Já tem conta?{" "}
            <button
              onClick={() => navigate("/auth?role=student")}
              className="underline font-medium hover:text-primary-foreground transition-colors"
            >
              Entrar
            </button>
          </p>
        </div>
      </motion.div>

      {/* Lado do Instrutor - Verde Escuro */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 bg-secondary flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-40 h-40 border-4 border-secondary-foreground rounded-full" />
          <div className="absolute bottom-10 left-10 w-28 h-28 border-4 border-secondary-foreground rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-20 h-20 border-4 border-secondary-foreground rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-8 bg-primary/20 rounded-full flex items-center justify-center"
          >
            <Car className="w-12 h-12 lg:w-16 lg:h-16 text-primary" />
          </motion.div>

          <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary-foreground mb-4">
            Sou Instrutor
          </h1>
          <p className="text-secondary-foreground/70 text-lg mb-8">
            Gerencie suas aulas, alcance mais alunos e aumente seus ganhos
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/cadastro-instrutor")}
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Quero ensinar
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="mt-6 text-secondary-foreground/60">
            Já tem conta?{" "}
            <button
              onClick={() => navigate("/auth?role=instructor")}
              className="underline font-medium hover:text-secondary-foreground transition-colors"
            >
              Entrar
            </button>
          </p>
        </div>
      </motion.div>

      {/* Logo Central */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex"
      >
        <div className="w-20 h-20 bg-background rounded-full shadow-xl flex items-center justify-center border-4 border-background">
          <div className="text-center">
            <span className="text-xl font-display font-bold text-secondary">
              Dirija<span className="text-primary">.ja</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SplashPage;
