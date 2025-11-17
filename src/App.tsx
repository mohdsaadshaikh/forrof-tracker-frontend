import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import NotFound from "./pages/NotFound";
import Announcements from "./pages/admin/announcements";
import Attendance from "./pages/admin/attendance";
import Dashboard from "./pages/admin/dashboard";
import Employees from "./pages/admin/employees";
import Leaves from "./pages/admin/leaves";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/profile";
import VerifySuccess from "./pages/auth/Verify-success";
import AuthLayout from "./layout/auth-layout";
import ProtectedRoute from "./layout/app-layout/ProtectedRoute";
import { useRole } from "./hooks/useRole";
import EmployeeDashboard from "./pages/employee/dashboard";
import EmployeeLeaves from "./pages/employee/leaves";
import EmployeeAnnouncements from "./pages/employee/announcements";

const queryClient = new QueryClient();

const App = () => {
  const { isAdmin, isEmployee } = useRole();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/verify-success" element={<VerifySuccess />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {isAdmin && (
                <>
                  <Route index element={<Dashboard />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/leaves" element={<Leaves />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              )}
              {isEmployee && (
                <>
                  <Route index element={<EmployeeDashboard />} />
                  <Route path="/leaves" element={<EmployeeLeaves />} />
                  <Route
                    path="/announcements"
                    element={<EmployeeAnnouncements />}
                  />
                </>
              )}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
