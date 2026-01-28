import { Star, MapPin, Shield, Car, Clock, Snowflake, Gauge, Settings, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface VehicleFeatures {
  airConditioning: boolean;
  powerSteering: boolean;
  dualCommand: boolean;
  inspected: boolean;
}

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
  // New vehicle fields
  vehicleName?: string;
  vehicleYear?: number;
  vehicleImage?: string;
  vehicleFeatures?: VehicleFeatures;
  // Instructor preferences
  gender?: "male" | "female";
  lessonType?: "habilitacao" | "medo" | "both";
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
  vehicleName = "Chevrolet Onix 2023",
  vehicleYear,
  vehicleImage,
  vehicleFeatures = {
    airConditioning: true,
    powerSteering: true,
    dualCommand: true,
    inspected: true,
  },
}: InstructorCardProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-medium transition-all duration-300 group">
      {/* Vehicle Image Section */}
      <div className="relative h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
        {vehicleImage ? (
          <img 
            src={vehicleImage} 
            alt={vehicleName} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Car className="w-16 h-16 opacity-50" />
            <span className="text-sm font-medium">{vehicleName}</span>
          </div>
        )}
        
        {/* Vehicle Inspected Badge */}
        {vehicleFeatures.inspected && (
          <div className="absolute top-3 right-3 bg-green-light text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-lg">
            <CheckCircle className="w-3.5 h-3.5" />
            Veículo Vistoriado
          </div>
        )}
      </div>

      {/* Vehicle Features Badges */}
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground mb-2">{vehicleName}</p>
        <div className="flex flex-wrap gap-1.5">
          {vehicleFeatures.airConditioning && (
            <Badge variant="outline" className="text-xs bg-background border-border">
              <Snowflake className="w-3 h-3 mr-1 text-muted-foreground" />
              Ar Condicionado
            </Badge>
          )}
          {vehicleFeatures.powerSteering && (
            <Badge variant="outline" className="text-xs bg-background border-border">
              <Gauge className="w-3 h-3 mr-1 text-primary" />
              Dir. Hidráulica
            </Badge>
          )}
          {vehicleFeatures.dualCommand && (
            <Badge variant="outline" className="text-xs bg-background border-border">
              <Settings className="w-3 h-3 mr-1 text-green-light" />
              Duplo Comando
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center font-display font-bold text-xl overflow-hidden">
              {avatar}
            </div>
            {verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-light rounded-full flex items-center justify-center">
                <Shield className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-semibold text-base truncate group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-display font-bold text-primary">
                  R$ {pricePerHour}
                </p>
                <p className="text-xs text-muted-foreground">/aula</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">
                  ({reviewCount})
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
