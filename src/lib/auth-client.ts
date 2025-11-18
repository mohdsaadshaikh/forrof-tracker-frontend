import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { admin, employee, ac } from "./permission";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:3000",
  baseURL: import.meta.env.VITE_SERVER_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        employee,
      },
    }),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  forgetPassword,
  resetPassword,
  verifyEmail,
  changePassword,
} = authClient;

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: "admin" | "employee";
  image?: string;
  department?: "HR" | "IT" | "SALES" | "MARKETING" | "FINANCE" | "OPERATIONS";
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    token: string;
  };
  user: User;
};
