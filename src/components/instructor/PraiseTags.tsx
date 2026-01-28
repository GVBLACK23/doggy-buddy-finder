import { Badge } from "@/components/ui/badge";

interface PraiseTagsProps {
  tags: string[];
  className?: string;
}

const defaultTags = [
  "Muita Paciência",
  "Pontual",
  "Deixa Calmo",
  "Carro Limpo",
  "Didático",
  "Profissional",
];

const PraiseTags = ({ tags = defaultTags, className = "" }: PraiseTagsProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="bg-primary/10 text-primary hover:bg-primary/20 border-0 cursor-default text-xs font-medium px-3 py-1"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default PraiseTags;
