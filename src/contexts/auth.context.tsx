import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthError, type Session, type User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// payloads
interface SignUpPayload {
  email: string;
  password: string;
  name: string;
}

interface SignUpResult {
  success: boolean;
  message?: string;
}

interface VerifyPayload {
  email: string;
  token: string;
}

interface VerifyResult {
  success: boolean;
  message?: string;
}

type UserProfile = {
  name: string;
  email: string;
  avatarUrl: string;
};

type AuthContextValue = {
  user: (User & { profile: UserProfile | null }) | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (payload: SignUpPayload) => Promise<SignUpResult>;
  verify: (payload: VerifyPayload) => Promise<VerifyResult>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const extractProfile = (user: User | null): UserProfile | null => {
  if (!user) return null;

  const metadata = user.user_metadata ?? {};
  const name =
    metadata.full_name ||
    metadata.name ||
    metadata.user_name ||
    (user.email ? user.email.split('@')[0] : 'Anonymous');

  return {
    name,
    email: user.email ?? metadata.email ?? '',
    avatarUrl: metadata.avatar_url || metadata.picture || '',
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setIsLoading(false);
    };

    void initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
      setIsAuthenticating(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const verify = async (payload: VerifyPayload): Promise<VerifyResult> => {
    setIsAuthenticating(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: payload.email,
        token: payload.token,
        type: 'email',
      });
      if (error) throw error;
      return { success: true };
    } catch (error: unknown) {
      if (error instanceof AuthError)
        return { success: false, message: error.message };
      return { success: false };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signUp = async (payload: SignUpPayload): Promise<SignUpResult> => {
    setIsAuthenticating(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: { name: payload.name },
        },
      });
      if (error) throw error;
      return { success: true };
    } catch (error: unknown) {
      if (error instanceof AuthError)
        return { success: false, message: error.message };
      return { success: false };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signInGoogle = async () => {
    try {
      setIsAuthenticating(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: import.meta.env.VITE_APP_URL,
        },
      });
      if (error) {
        setIsAuthenticating(false);
        toast.success('Failed to sign in dengan Google');
        return;
      }
      setIsAuthenticating(false);
    } catch {
      setIsAuthenticating(false);
    }
  };

  const signOut = async () => {
    const toastId = toast.loading('Signed you out...');
    try {
      setIsAuthenticating(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setIsAuthenticating(false);
        return;
      }
      setIsAuthenticating(false);
    } catch {
      setIsAuthenticating(false);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const user = session?.user
    ? { ...session.user, profile: extractProfile(session.user) }
    : null;

  const value: AuthContextValue = {
    user,
    session,
    isLoading: isLoading || isAuthenticating,
    signUp,
    verify,
    signInGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
