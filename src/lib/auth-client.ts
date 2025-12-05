import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin, employee } from "./permission";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_SERVER_URL,
  fetchOptions: {
    credentials: "include",
  },

  plugins: [
    inferAdditionalFields({
      user: {
        isPasswordChanged: {
          type: "boolean",
        },
        department: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        salary: {
          type: "number",
        },
        address: {
          type: "string",
        },
      },
    }),
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
  updateUser,
} = authClient;

export type Session = {
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    token: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    role?: string;
    image?: string | null;
    department?: "HR" | "IT" | "SALES" | "MARKETING" | "FINANCE" | "OPERATIONS";
    isPasswordChanged: boolean;
    phone?: string | null;
    address?: string | null;
    salary?: number | null;
    createdAt: Date;
    updatedAt: Date;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | null;
  };
};
