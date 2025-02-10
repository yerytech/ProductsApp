import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { AuthStatus } from "../../../infrastructure/interfacea/auth.status";
import { authLogin } from "../../../actions/auth/auth";

export interface AuthState {
token?: string;
  user?: User;
  status: AuthStatus;
login: (email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set,get)=> ({
  status: 'checking',
  token: undefined,
  user: undefined,
  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({ status: "not-authenticated", token: undefined, user: undefined });
      return false;
    }
    // ! Save the stoken in storage
    console.log(resp);
    

    set({
      status: "authenticated",
      user: resp.user,
      token: resp.token,
    });

    return true;
  }
}));