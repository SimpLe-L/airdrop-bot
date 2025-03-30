import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  permissions: string[];
  setUser: (user: User, permissions: string[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {id: "dd", name: 'test'},
      permissions: [],
      setUser: (user, permissions) => set({ user, permissions }),
      logout: () => set({ user: null, permissions: [] })
    }),
    {
      name: 'auth-storage'
    }
  )
);
