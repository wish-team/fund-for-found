'use client';

import React, { ReactNode, memo, useEffect } from 'react';
import { Spinner } from '@nextui-org/react';
import { useAuthStore } from '@/store/authStore';
import { User } from '@supabase/supabase-js';

interface AuthWrapperProps {
  children: ReactNode | ((user: User | null) => ReactNode);
  loadingComponent?: ReactNode;
}

export const AuthWrapper = memo(function AuthWrapper({ 
  children, 
  loadingComponent = <Spinner label="Loading..." /> 
}: AuthWrapperProps) {
  const { user, initialLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (initialLoading) {
    return loadingComponent;
  }

  if (typeof children === 'function') {
    return <>{children(user)}</>;
  }

  return <>{children}</>;
});

AuthWrapper.displayName = 'AuthWrapper';