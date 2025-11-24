import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import Header from "./Header";
import { useSession } from "@/lib/auth-client";

const AppLayout = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();
  console.log("AppLayout Session:", session);

  if (!session) {
    navigate("/login");
    return null;
  }

  if (isPending) {
    return <p className="text-md font-medium loading-text"></p>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-100">
        <AppSidebar />
        <main className="w-full">
          <Header />
          <div className="p-3 sm:p-6">
            <Suspense
              fallback={<p className="text-md font-medium loading-text"></p>}
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
