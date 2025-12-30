import { Star, MapPin, Shield, Car, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface InstructorCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  categories: string[];
  transmission: string;
  hasCarForTest: boolean;
  verified: boolean;
  avatar: string;
  experience: number;
}

const InstructorCard = ({
  id,
  name,
  location,
  rating,
  reviewCount,
  pricePerHour,
  categories,
  transmission,
  hasCarForTest,
  verified,
  avatar,
  experience,
}: InstructorCardProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-medium transition-all duration-300 group">
      <div className="p-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center font-display font-bold text-2xl overflow-hidden">
              {avatar}
            </div>
            {verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-light rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-semibold text-lg truncate group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-display font-bold text-primary">
                  R$ {pricePerHour}
                </p>
                <p className="text-xs text-muted-foreground">/aula</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">
                  ({reviewCount})
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                {experience} anos exp.
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              CNH {cat}
            </Badge>
          ))}
          <Badge variant="outline" className="text-xs">
            {transmission}
          </Badge>
          {hasCarForTest && (
            <Badge variant="outline" className="text-xs border-green-light text-green-light">
              <Car className="w-3 h-3 mr-1" />
              Carro para prova
            </Badge>
          )}
        </div>
      </div>

      <div className="px-6 pb-6">
        <Link to={`/instrutor/${id}`}>
          <Button className="w-full" variant="outline">
            Ver perfil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InstructorCard;
