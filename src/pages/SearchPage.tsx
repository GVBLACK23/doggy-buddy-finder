import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InstructorCard from "@/components/instructors/InstructorCard";
import SearchFilters, { FilterState } from "@/components/instructors/SearchFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { Helmet } from "react-helmet";

// Mock data - will be replaced with real data from the database
const mockInstructors = [
  {
    id: "1",
    name: "Carlos Oliveira",
    location: "São Paulo, SP - Pinheiros",
    rating: 4.9,
    reviewCount: 127,
    pricePerHour: 85,
    categories: ["B"],
    transmission: "Manual",
    hasCarForTest: true,
    verified: true,
    avatar: "CO",
    experience: 8,
  },
  {
    id: "2",
    name: "Ana Paula Santos",
    location: "São Paulo, SP - Moema",
    rating: 4.8,
    reviewCount: 89,
    pricePerHour: 95,
    categories: ["A", "B"],
    transmission: "Automático",
    hasCarForTest: true,
    verified: true,
    avatar: "AP",
    experience: 12,
  },
  {
    id: "3",
    name: "Roberto Silva",
    location: "São Paulo, SP - Santana",
    rating: 4.7,
    reviewCount: 64,
    pricePerHour: 70,
    categories: ["B"],
    transmission: "Manual",
    hasCarForTest: false,
    verified: true,
    avatar: "RS",
    experience: 5,
  },
  {
    id: "4",
    name: "Fernanda Costa",
    location: "São Paulo, SP - Itaim Bibi",
    rating: 5.0,
    reviewCount: 42,
    pricePerHour: 120,
    categories: ["B"],
    transmission: "Automático",
    hasCarForTest: true,
    verified: true,
    avatar: "FC",
    experience: 15,
  },
  {
    id: "5",
    name: "Marcos Pereira",
    location: "São Paulo, SP - Vila Mariana",
    rating: 4.6,
    reviewCount: 98,
    pricePerHour: 75,
    categories: ["A", "B", "C"],
    transmission: "Manual",
    hasCarForTest: true,
    verified: false,
    avatar: "MP",
    experience: 10,
  },
  {
    id: "6",
    name: "Juliana Lima",
    location: "São Paulo, SP - Tatuapé",
    rating: 4.9,
    reviewCount: 156,
    pricePerHour: 90,
    categories: ["B"],
    transmission: "Automático",
    hasCarForTest: true,
    verified: true,
    avatar: "JL",
    experience: 7,
  },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("localizacao") || "");
  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get("categoria") ? [searchParams.get("categoria")!] : [],
    priceRange: [50, 200],
    minRating: 0,
    transmission: [],
    hasCarForTest: null,
  });

  const filteredInstructors = mockInstructors.filter((instructor) => {
    // Category filter
    if (
      filters.categories.length > 0 &&
      !filters.categories.some((cat) => instructor.categories.includes(cat))
    ) {
      return false;
    }

    // Price filter
    if (
      instructor.pricePerHour < filters.priceRange[0] ||
      instructor.pricePerHour > filters.priceRange[1]
    ) {
      return false;
    }

    // Rating filter
    if (instructor.rating < filters.minRating) {
      return false;
    }

    // Transmission filter
    if (
      filters.transmission.length > 0 &&
      !filters.transmission.includes(instructor.transmission)
    ) {
      return false;
    }

    // Car for test filter
    if (
      filters.hasCarForTest !== null &&
      instructor.hasCarForTest !== filters.hasCarForTest
    ) {
      return false;
    }

    // Location filter (simple text search)
    if (
      location &&
      !instructor.location.toLowerCase().includes(location.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <Helmet>
        <title>Buscar Instrutores de Direção | Dirija.ja</title>
        <meta
          name="description"
          content="Encontre instrutores de direção qualificados perto de você. Filtre por categoria CNH, preço, avaliação e mais."
        />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Search Header */}
            <div className="bg-card p-6 rounded-2xl border border-border mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cidade ou bairro..."
                    className="pl-10 h-12"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button className="h-12 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters */}
              <aside className="lg:w-72">
                <SearchFilters onFilterChange={setFilters} />
              </aside>

              {/* Results */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {filteredInstructors.length}
                    </span>{" "}
                    instrutores encontrados
                  </p>
                </div>

                {filteredInstructors.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredInstructors.map((instructor) => (
                      <InstructorCard key={instructor.id} {...instructor} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-2xl border border-border p-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      Nenhum instrutor encontrado com os filtros selecionados.
                    </p>
                    <Button variant="outline" onClick={() => setFilters({
                      categories: [],
                      priceRange: [50, 200],
                      minRating: 0,
                      transmission: [],
                      hasCarForTest: null,
                    })}>
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
