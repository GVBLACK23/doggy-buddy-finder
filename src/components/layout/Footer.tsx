import { Link } from "react-router-dom";
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">
                Dirija<span className="text-primary">.ja</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-foreground/70">
              Conectando alunos a instrutores de direção qualificados em todo o Brasil.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/buscar" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Encontrar Instrutor
                </Link>
              </li>
              <li>
                <Link to="/seja-instrutor" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Seja Instrutor
                </Link>
              </li>
              <li>
                <a href="#como-funciona" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <Link to="/ajuda" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Ajuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/termos" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Mail className="w-4 h-4" />
                contato@dirijaja.com.br
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Phone className="w-4 h-4" />
                (11) 99999-9999
              </li>
              <li className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                São Paulo, SP - Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10">
          <p className="text-center text-sm text-secondary-foreground/50">
            © 2024 Dirija.ja. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
