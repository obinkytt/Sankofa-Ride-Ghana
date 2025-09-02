
    import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
    import { supabase } from "@/integrations/supabase/client";
    import { Session, User } from "@supabase/supabase-js";
    import { Database } from "@/integrations/supabase/types";

    type Profile = Database["public"]["Tables"]["profiles"]["Row"];

    interface AuthContextType {
      session: Session | null;
      user: User | null;
      profile: Profile | null;
      userRole?: "rider" | "driver" | "admin";
      loading: boolean;
      refreshProfile: () => Promise<void>;
    }

    const AuthContext = createContext<AuthContextType>({
      session: null,
      user: null,
      profile: null,
      userRole: undefined,
      loading: true,
      refreshProfile: async () => {},
    });

    export function AuthProvider({ children }: { children: ReactNode }) {
      const [session, setSession] = useState<Session | null>(null);
      const [user, setUser] = useState<User | null>(null);
      const [profile, setProfile] = useState<Profile | null>(null);
      const [userRole, setUserRole] = useState<"rider" | "driver" | "admin">();
      const [loading, setLoading] = useState(true);

      const fetchProfile = useCallback(async (currentUser: User) => {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setProfile(null);
          setUserRole(undefined);
          return;
        }

        if (profileData) {
            setProfile(profileData as Profile);
            if (currentUser.email?.includes("+admin")) {
                setUserRole("admin");
            } else if (profileData.role) {
                setUserRole(profileData.role as "rider" | "driver");
            } else {
                setUserRole(undefined);
            }
        } else {
            setProfile(null);
            setUserRole(undefined);
        }
      }, []);

      useEffect(() => {
        setLoading(true);
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            const currentUser = session?.user;
            setSession(session);
            setUser(currentUser ?? null);

            if (currentUser) {
              await fetchProfile(currentUser);
            } else {
              setProfile(null);
              setUserRole(undefined);
            }
            setLoading(false);
          }
        );

        return () => {
          authListener.subscription.unsubscribe();
        };
      }, [fetchProfile]);

      const refreshProfile = useCallback(async () => {
        if (user) {
            await fetchProfile(user);
        }
      }, [user, fetchProfile]);

      const value = {
        session,
        user,
        profile,
        userRole,
        loading,
        refreshProfile,
      };

      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
    };
  