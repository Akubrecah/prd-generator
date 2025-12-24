import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut, savePrd as supabaseSavePrd, getUserPrds, deletePrd as supabaseDeletePrd, updateUserProfile } from '../lib/supabase';

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      supabaseUser: null,
      tier: 'free',
      billingCycle: 'monthly',
      isLoading: false,
      authError: null,

      // Supabase Auth Methods
      signUp: async (email, password, name) => {
        set({ isLoading: true, authError: null });
        const { data, error } = await supabaseSignUp(email, password, name);
        if (error) {
          set({ isLoading: false, authError: error.message });
          return { error };
        }
        set({ 
          supabaseUser: data.user,
          user: { email, name, id: data.user?.id },
          isLoading: false 
        });
        return { data };
      },

      signIn: async (email, password) => {
        set({ isLoading: true, authError: null });
        const { data, error } = await supabaseSignIn(email, password);
        if (error) {
          set({ isLoading: false, authError: error.message });
          return { error };
        }
        set({ 
          supabaseUser: data.user,
          user: { 
            email: data.user?.email, 
            name: data.user?.user_metadata?.name || data.user?.email?.split('@')[0],
            id: data.user?.id 
          },
          isLoading: false 
        });
        // Sync PRDs from Supabase
        get().syncPrdsFromSupabase();
        return { data };
      },

      signInWithOAuth: async (provider) => {
        set({ isLoading: true, authError: null });
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options: {
            redirectTo: window.location.origin + '/dashboard',
          },
        });
        if (error) {
          set({ isLoading: false, authError: error.message });
        }
        return { data, error };
      },

      signOutSupabase: async () => {
        set({ isLoading: true });
        await supabaseSignOut();
        set({ 
          user: null, 
          supabaseUser: null, 
          isLoading: false,
          currentPrd: null
        });
      },

      // Sync PRDs from Supabase
      syncPrdsFromSupabase: async () => {
        const user = get().supabaseUser;
        if (!user) return;
        
        const { data, error } = await getUserPrds(user.id);
        if (!error && data) {
          set({ history: data.map(p => ({ ...p.data, id: p.id })) });
        }
      },

      // Legacy local auth (fallback when Supabase not configured)
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null, supabaseUser: null }),
      
      upgrade: async (tier) => {
        const user = get().supabaseUser;
        if (user) {
          await updateUserProfile(user.id, { tier, credits: get().credits + (tier === 'pro' ? 50000 : 0) });
        }
        set((state) => ({ 
          tier, 
          credits: state.credits + (tier === 'pro' ? 50000 : 0)
        }));
      },

      setBillingCycle: (cycle) => set({ billingCycle: cycle }),

      // Billing
      credits: 5000,
      deductCredits: (amount) => {
        const current = get().credits;
        if (current >= amount) {
          set({ credits: current - amount });
          return true;
        }
        return false;
      },
      addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),

      // User Settings
      apiKey: 'AIzaSyAnNf8zC57swK0TdrQXtyv0Ub7MmK2J6zM',
      setApiKey: (key) => set({ apiKey: key }),

      // Project History
      history: [],
      addPrd: async (prd) => {
        const user = get().supabaseUser;
        const newPrd = {
          ...prd,
          id: prd.id || crypto.randomUUID(),
          createdAt: prd.createdAt || Date.now(),
          lastModified: Date.now()
        };

        // Save to Supabase if authenticated
        if (user) {
          await supabaseSavePrd(newPrd, user.id);
        }

        set((state) => {
          const existingIndex = state.history.findIndex(p => p.id === newPrd.id);
          if (existingIndex >= 0) {
            const newHistory = [...state.history];
            newHistory[existingIndex] = newPrd;
            return { history: newHistory };
          }
          return { history: [newPrd, ...state.history] };
        });
      },

      deletePrd: async (id) => {
        const user = get().supabaseUser;
        if (user) {
          await supabaseDeletePrd(id);
        }
        set((state) => ({ history: state.history.filter(p => p.id !== id) }));
      },

      // Active Wizard State
      currentPrd: null,
      setCurrentPrd: (prd) => set({ currentPrd: prd }),
      resetCurrentPrd: () => set({ currentPrd: null }),

      // Initialize auth state from Supabase session
      initializeAuth: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          set({
            supabaseUser: session.user,
            user: {
              email: session.user.email,
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
              id: session.user.id
            }
          });
          get().syncPrdsFromSupabase();
        }
      },

      onAuthStateChange: (callback) => {
        return supabase.auth.onAuthStateChange(callback);
      },
    }),
    {
      name: 'prd-generator-storage',
      partialize: (state) => ({
        user: state.user,
        tier: state.tier,
        billingCycle: state.billingCycle,
        credits: state.credits,
        apiKey: state.apiKey,
        history: state.history,
      }),
    }
  )
);
