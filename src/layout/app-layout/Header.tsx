import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthState } from "@/hooks/useAuthState";

const Header = () => {
  const { data: session } = useSession();
  const { loading, setLoading, setError, setSuccess, resetState } =
    useAuthState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onRequest: () => {
            resetState();
            setLoading(true);
          },

          onResponse: () => {
            setLoading(false);
          },

          onSuccess: () => {
            setSuccess("Logged out successfully");
            toast.success("Logged out successfully!");
            navigate("/login", { replace: true });
          },

          onError: (ctx) => {
            toast.error(ctx.error.message || "Logout failed");
            setError(ctx.error.message);
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong while logging out");
      setError("Something went wrong");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const userName = session?.user?.name.split(" ")[0] || "User";
  const userEmail = session?.user?.email.slice(0, 10) || "";

  return (
    <header className="h-16 border-b flex items-center md:justify-end justify-between px-4 sticky top-0 bg-background z-10">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="text-right">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
            <Avatar>
              {/* <AvatarImage src={session?.user?.image} /> */}
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-red-100!"
            >
              <LogOut className="mr-2 h-4 w-4 text-destructive" />
              <span className="text-destructive">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
