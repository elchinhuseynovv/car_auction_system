import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

interface AuthLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, requireAuth = false }) => {
  const { user, setUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/account" replace />;
  }

  return <>{children}</>;
};

export default AuthLayout;