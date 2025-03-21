
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Algorithms from "./pages/Algorithms";
import DataStructures from "./pages/DataStructures";
import Practice from "./pages/Practice";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/NotFound";
import AlgorithmDetail from "./pages/AlgorithmDetail";
import DataStructureDetail from "./pages/DataStructureDetail";
import ProblemSolving from "./pages/ProblemSolving";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter basename="/">
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/algorithm/:algorithmSlug" element={<AlgorithmDetail />} />
            <Route path="/data-structure/:structureName" element={<DataStructureDetail />} />
            <Route path="/practice/:problemId" element={<ProblemSolving />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
