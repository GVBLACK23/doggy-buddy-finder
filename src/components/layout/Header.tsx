import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-secondary">
              Dirija<span className="text-primary">.ja</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/buscar" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Encontrar Instrutor
            </Link>
            <a 
              href="#como-funciona" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Como Funciona
            </a>
            <Link 
              to="/selecionar-perfil" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Seja Instrutor
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button size="sm">
                Cadastrar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/buscar" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Encontrar Instrutor
              </Link>
              <a 
                href="#como-funciona" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </a>
              <Link 
                to="/selecionar-perfil" 
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Seja Instrutor
              </Link>
              <div className="flex gap-2 pt-4 border-t border-border">
                <Link to="/auth" className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link to="/auth?mode=signup" className="flex-1">
                  <Button className="w-full" size="sm">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
