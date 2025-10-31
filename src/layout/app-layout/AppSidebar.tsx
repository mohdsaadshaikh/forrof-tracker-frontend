import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Briefcase,
  Calendar,
  CalendarCheck,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Employees", url: "/employees", icon: BarChart3 },
  { title: "Attendance Tracking", url: "/attendance", icon: CalendarCheck },
  { title: "Leave Management", url: "/leave", icon: Briefcase },
  { title: "Announcements", url: "/announcements", icon: Calendar },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Setting", url: "/setting", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

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
    </Sidebar>
  );
}
