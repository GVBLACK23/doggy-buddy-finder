import { Navigate } from "react-router-dom";

// This file now just redirects to the new SplashPage
// Keeping for backwards compatibility
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
