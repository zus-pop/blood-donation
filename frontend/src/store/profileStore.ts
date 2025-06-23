import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProps } from '@/apis/user.api';

interface ProfileState {
    profile: UserProps | null;
    setProfile: (profile: UserProps | null) => void;
    clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set({ profile }),
            clearProfile: () => set({ profile: null }),
        }),
        {
            name: 'profile-storage',
        }
    )
);
