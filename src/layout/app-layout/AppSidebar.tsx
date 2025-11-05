import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth-client";
import {
  BarChart3,
  Briefcase,
  Calendar,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Employees", url: "/employees", icon: BarChart3 },
  { title: "Attendance Tracking", url: "/attendance", icon: CalendarCheck },
  { title: "Leave Management", url: "/leave", icon: Briefcase },
  { title: "Announcements", url: "/announcements", icon: Calendar },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/imgs/logo.png" alt="Logo" />
            </div>
            {open && <span className="font-semibold text-2xl">Forrof</span>}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent className="">
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`my-1 border-l-4 border-transparent ${
                      isActive ? "border-l-4 border-brand" : ""
                    }`}
                  >
                    <SidebarMenuButton
                      size="lg"
                      asChild
                      className={`${
                        isActive
                          ? "bg-blue-50 rounded-none text-brand hover:bg-blue-50 hover:text-brand"
                          : ""
                      } `}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-[18px] w-[18px] mr-1" />
                        <span className="text-[15px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={handleLogout}
              className="text-destructive hover:bg-red-100 hover:text-destructive cursor-pointer"
            >
              <LogOut className="h-[18px] w-[18px] mr-1" />
              <span className="text-[15px]">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
