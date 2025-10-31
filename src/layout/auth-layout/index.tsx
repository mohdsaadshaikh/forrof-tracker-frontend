import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen flex">
      <div
        className="hidden bg-[#253D90] lg:flex lg:w-[40%] items-center justify-center bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url('/imgs/brand-bg.png')`,
        }}
      ></div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
