import { useSession } from "@/lib/auth-client";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const navigationDoneRef = useRef(false);

  const user = session?.user as Record<string, unknown>;
  const role = user?.role as string | undefined;
  const isProfileCompleted = (user?.isProfileCompleted as boolean) ?? true;

  // Use effect to handle navigation - must be called unconditionally
  useEffect(() => {
    // Skip for admin users
    if (role === "ADMIN") {
      navigationDoneRef.current = false;
      return;
    }

    // Only navigate once and prevent re-navigation
    if (session?.user && !isProfileCompleted && !navigationDoneRef.current) {
      navigationDoneRef.current = true;
      navigate("/onboarding", { replace: true });
    }
  }, [session, isProfileCompleted, navigate, role]);

  return <>{children}</>;
}
