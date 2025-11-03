import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 border-b flex items-center md:justify-end justify-between px-4 sticky top-0 bg-background z-10">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">Usman Irfan</p>
            <p className="text-xs text-muted-foreground">HR Manager</p>
          </div>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
