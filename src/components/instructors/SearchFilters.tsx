import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  transmission: string[];
  hasCarForTest: boolean | null;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [50, 200],
    minRating: 0,
    transmission: [],
    hasCarForTest: null,
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
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-display font-semibold mb-3">Categoria CNH</h4>
        <div className="space-y-2">
          {["A", "B", "AB", "C", "D", "E"].map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={filters.categories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">
                Categoria {cat}
              </Label>
            </div>
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

      {/* Transmission */}
      <div>
        <h4 className="font-display font-semibold mb-3">Tipo de câmbio</h4>
        <div className="space-y-2">
          {["Manual", "Automático"].map((trans) => (
            <div key={trans} className="flex items-center gap-2">
              <Checkbox
                id={`trans-${trans}`}
                checked={filters.transmission.includes(trans)}
                onCheckedChange={() => toggleTransmission(trans)}
              />
              <Label htmlFor={`trans-${trans}`} className="text-sm cursor-pointer">
                {trans}
              </Label>
            </div>
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
