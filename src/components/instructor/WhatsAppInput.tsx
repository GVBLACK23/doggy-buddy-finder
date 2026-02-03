import { Input } from "@/components/ui/input";

interface WhatsAppInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const WhatsAppInput = ({
  id,
  value,
  onChange,
  required = false,
  className,
}: WhatsAppInputProps) => {
  const formatWhatsApp = (input: string): string => {
    const numbers = input.replace(/\D/g, "");
    
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    onChange(formatted);
  };

  return (
    <Input
      id={id}
      type="tel"
      inputMode="numeric"
      value={value}
      onChange={handleChange}
      placeholder="(11) 99999-9999"
      maxLength={15}
      required={required}
      className={className}
    />
  );
};

export default WhatsAppInput;

export const getWhatsAppNumber = (formatted: string): string => {
  const numbers = formatted.replace(/\D/g, "");
  return `55${numbers}`;
};

export const getWhatsAppLink = (formatted: string, message?: string): string => {
  const number = getWhatsAppNumber(formatted);
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${encodedMessage}`;
};
