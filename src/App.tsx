import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import AuthPage from "./pages/AuthPage";
import ProfileSelectionPage from "./pages/ProfileSelectionPage";
import InstructorRegistrationPage from "./pages/InstructorRegistrationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/selecionar-perfil" element={<ProfileSelectionPage />} />
          <Route path="/cadastro-instrutor" element={<InstructorRegistrationPage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/instrutor/:id" element={<InstructorProfilePage />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
