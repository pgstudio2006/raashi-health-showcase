import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import BookConsultation from "./pages/BookConsultation";
import Confirmation from "./pages/Confirmation";
import Prescriptions from "./pages/Prescriptions";
import DoctorPortal from "./pages/DoctorPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="grain-overlay" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/book/:id" element={<BookConsultation />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/doctor" element={<DoctorPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
