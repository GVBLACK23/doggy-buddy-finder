import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X, Target, Heart } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  transmission: string[];
  hasCarForTest: boolean | null;
  femaleInstructorOnly: boolean;
  lessonObjective: string | null;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [50, 200],
    minRating: 0,
    transmission: [],
    hasCarForTest: null,
    femaleInstructorOnly: false,
    lessonObjective: null,
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleCategory = (cat: string) => {
    const newCategories = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    updateFilter("categories", newCategories);
  };

  const toggleTransmission = (trans: string) => {
    const newTransmission = filters.transmission.includes(trans)
      ? filters.transmission.filter((t) => t !== trans)
      : [...filters.transmission, trans];
    updateFilter("transmission", newTransmission);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [50, 200],
      minRating: 0,
      transmission: [],
      hasCarForTest: null,
      femaleInstructorOnly: false,
      lessonObjective: null,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Lesson Objective - NEW */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-primary" />
          <h4 className="font-display font-semibold">Objetivo da Aula</h4>
        </div>
        <div className="space-y-2">
          {[
            { value: null, label: "Todos os objetivos" },
            { value: "habilitacao", label: "Treino para Habilitação (Detran)" },
            { value: "medo", label: "Habilitados com Medo" },
          ].map((option) => (
            <button
              key={String(option.value)}
              onClick={() => updateFilter("lessonObjective", option.value)}
              className={`w-full p-3 rounded-xl border-2 text-left text-sm transition-all ${
                filters.lessonObjective === option.value
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission - Enhanced */}
      <div>
        <h4 className="font-display font-semibold mb-3">Tipo de Câmbio</h4>
        <div className="grid grid-cols-2 gap-2">
          {["Manual", "Automático"].map((trans) => (
            <button
              key={trans}
              onClick={() => toggleTransmission(trans)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                filters.transmission.includes(trans)
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              }`}
            >
              {trans}
            </button>
          ))}
        </div>
      </div>

      {/* Female Instructor Preference - NEW */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-center gap-3">
          <Checkbox
            id="female-instructor"
            checked={filters.femaleInstructorOnly}
            onCheckedChange={(checked) =>
              updateFilter("femaleInstructorOnly", checked === true)
            }
          />
          <div className="flex-1">
          <Label
              htmlFor="female-instructor"
              className="text-sm font-medium cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-primary" />
              Apenas Instrutoras Mulheres
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Ideal para alunas que preferem
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-display font-semibold mb-3">Categoria CNH</h4>
        <div className="grid grid-cols-3 gap-2">
          {["A", "B", "AB", "C", "D", "E"].map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${
                filters.categories.includes(cat)
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-display font-semibold mb-3">Preço por aula</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) =>
              updateFilter("priceRange", value as [number, number])
            }
            max={300}
            min={30}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>R$ {filters.priceRange[0]}</span>
            <span>R$ {filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-display font-semibold mb-3">Avaliação mínima</h4>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <Button
              key={rating}
              size="sm"
              variant={filters.minRating === rating ? "default" : "outline"}
              onClick={() => updateFilter("minRating", rating)}
              className="flex-1"
            >
              {rating === 0 ? "Todas" : `${rating}+`}
            </Button>
          ))}
        </div>
      </div>

      {/* Car for test */}
      <div>
        <h4 className="font-display font-semibold mb-3">Carro para prova</h4>
        <div className="flex gap-2">
          {[
            { value: null, label: "Todos" },
            { value: true, label: "Sim" },
            { value: false, label: "Não" },
          ].map((option) => (
            <Button
              key={String(option.value)}
              size="sm"
              variant={filters.hasCarForTest === option.value ? "default" : "outline"}
              onClick={() => updateFilter("hasCarForTest", option.value)}
              className="flex-1"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="ghost"
        className="w-full"
        onClick={clearFilters}
      >
        <X className="w-4 h-4 mr-2" />
        Limpar filtros
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setMobileOpen(true)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-card p-6 shadow-lg overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg">Filtros</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden lg:block bg-card p-6 rounded-2xl border border-border sticky top-24">
        <h3 className="font-display font-bold text-lg mb-6">Filtros</h3>
        <FilterContent />
      </div>
    </>
  );
};

export default SearchFilters;
