import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Profile {
  first_name: string | null;
  last_name: string | null;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  signIn: async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // Fetch profile after sign in
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', data.user.id)
        .single();
      
      set({ profile });
    }
  },
  signUp: async (email, password, firstName, lastName) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString(),
        });

      if (profileError) throw profileError;

      set({ profile: { first_name: firstName, last_name: lastName } });
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, profile: null });
  },
  updateProfile: async (data) => {
    const { user } = get();
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) throw error;
    set({ profile: { ...get().profile, ...data } });
  },
}));