// frontend/src/lib/auth-client.ts

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:3000",
  baseURL: "https://forrof-tracker-backend.vercel.app/",
  fetchOptions: {
    credentials: "include",
  },
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
  role: string;
  image?: string;
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
