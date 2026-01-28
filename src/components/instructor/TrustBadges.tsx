import { Shield, FileCheck, Car, CheckCircle } from "lucide-react";

interface TrustBadgesProps {
  cnhVerified?: boolean;
  backgroundChecked?: boolean;
  vehicleDocumented?: boolean;
  className?: string;
}

const TrustBadges = ({
  cnhVerified = true,
  backgroundChecked = true,
  vehicleDocumented = true,
  className = "",
}: TrustBadgesProps) => {
  const badges = [
    { 
      verified: cnhVerified, 
      icon: FileCheck, 
      label: "CNH Checada" 
    },
    { 
      verified: backgroundChecked, 
      icon: Shield, 
      label: "Antecedentes OK" 
    },
    { 
      verified: vehicleDocumented, 
      icon: Car, 
      label: "Carro em Dia" 
    },
  ];

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            badge.verified
              ? "bg-green-500/10 text-green-700 dark:text-green-400"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {badge.verified ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <badge.icon className="w-4 h-4" />
          )}
          {badge.label}
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
