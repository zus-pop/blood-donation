import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProps } from "@/apis/user.api";

interface ProfileState {
  accessToken: string | null;
  profile: UserProps | null;
  setProfile: (profile: UserProps | null) => void;
  clearProfile: () => void;
  setAccessToken: (accessToken: string | null) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      accessToken: null,
      profile: null,
      setProfile: (profile) => set({ profile }),
      setAccessToken: (accessToken) => set({ accessToken: accessToken }),
      clearProfile: () => set({ profile: null, accessToken: null }),
    }),
    {
      name: "profile-storage",
    }
  )
);
