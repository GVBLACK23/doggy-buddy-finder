import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TrustSignalsSection from "@/components/home/TrustSignalsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { Helmet } from "react-helmet";

const StudentHomePage = () => {
  return (
    <>
      <Helmet>
        <title>Dirija.ja - Encontre Instrutores de Direção Qualificados</title>
        <meta 
          name="description" 
          content="Conectamos você com instrutores de direção qualificados e experientes. Agende aulas práticas e conquiste sua CNH com confiança!" 
        />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <TrustSignalsSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default StudentHomePage;
