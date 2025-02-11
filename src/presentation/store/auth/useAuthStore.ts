import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { AuthStatus } from "../../../infrastructure/interfacea/auth.status";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
  token?: string;
  user?: User;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({ status: "not-authenticated", token: undefined, user: undefined });
      return false;
    }
    // ! Save the token in storage
    await StorageAdapter.setItem("token", resp.token);
    const storedtoken = await StorageAdapter.getItem("token");
    console.log("storetoken", storedtoken);

    set({
      status: "authenticated",
      user: resp.user,
      token: resp.token,
    });

    return true;
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: "not-authenticated", token: undefined, user: undefined });
      return;
    }
    await StorageAdapter.setItem("token", resp.token);
    set({
      status: "authenticated",
      user: resp.user,
      token: resp.token,
    });
  },
}));