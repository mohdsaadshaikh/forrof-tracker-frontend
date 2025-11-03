import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import Header from "./Header";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full ">
        <AppSidebar />
        <main className="flex-1">
          <Header />
          <div className="p-6">
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
