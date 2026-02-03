import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface CEPInputProps {
  id?: string;
  value: string;
  onChange: (cep: string) => void;
  onAddressFound?: (address: AddressData) => void;
  required?: boolean;
  className?: string;
}

export interface AddressData {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  fullAddress: string;
}

const CEPInput = ({
  id,
  value,
  onChange,
  onAddressFound,
  required = false,
  className,
}: CEPInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formatCEP = (input: string): string => {
    const numbers = input.replace(/\D/g, "");
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    onChange(formatted);
    setStatus("idle");
    setErrorMessage("");

    // Auto-search when CEP is complete
    if (formatted.replace(/\D/g, "").length === 8) {
      await searchCEP(formatted);
    }
  };

  const searchCEP = async (cep: string) => {
    const cleanCEP = cep.replace(/\D/g, "");
    if (cleanCEP.length !== 8) return;

    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      const data = await response.json();

      if (data.erro) {
        setStatus("error");
        setErrorMessage("CEP não encontrado");
        return;
      }

      const addressData: AddressData = {
        cep: cleanCEP,
        logradouro: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
        fullAddress: `${data.logradouro ? data.logradouro + ", " : ""}${data.bairro || ""}, ${data.localidade} - ${data.uf}`,
      };

      setStatus("success");
      onAddressFound?.(addressData);
    } catch (error) {
      console.error("Error fetching CEP:", error);
      setStatus("error");
      setErrorMessage("Erro ao buscar CEP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder="00000-000"
        maxLength={9}
        required={required}
        className={className}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
        {!isLoading && status === "success" && (
          <CheckCircle className="w-4 h-4 text-primary" />
        )}
        {!isLoading && status === "error" && (
          <AlertCircle className="w-4 h-4 text-destructive" />
        )}
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default CEPInput;
