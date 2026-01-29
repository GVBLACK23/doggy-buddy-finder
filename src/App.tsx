import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SplashPage from "./pages/SplashPage";
import StudentHomePage from "./pages/StudentHomePage";
import SearchPage from "./pages/SearchPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import AuthPage from "./pages/AuthPage";
import ProfileSelectionPage from "./pages/ProfileSelectionPage";
import InstructorRegistrationPage from "./pages/InstructorRegistrationPage";
import InstructorDashboardPage from "./pages/InstructorDashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Página de entrada - Split Screen */}
            <Route path="/" element={<SplashPage />} />
            
            {/* Auth */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/selecionar-perfil" element={<ProfileSelectionPage />} />
            <Route path="/cadastro-instrutor" element={<InstructorRegistrationPage />} />
            
            {/* Área do Aluno - Protegida */}
            <Route
              path="/home"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentHomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buscar"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instrutor/:id"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <InstructorProfilePage />
                </ProtectedRoute>
              }
            />
            
            {/* Área do Instrutor - Protegida */}
            <Route
              path="/dashboard-instrutor"
              element={
                <ProtectedRoute allowedRoles={["instructor"]}>
                  <InstructorDashboardPage />
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
