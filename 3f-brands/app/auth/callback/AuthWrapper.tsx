'use client';

import React, { ReactNode } from 'react';
import { useAuth, AuthUser } from '../../hooks/useAuth';
import { Spinner } from '@nextui-org/react';

interface AuthWrapperProps {
  children: ReactNode | ((user: AuthUser | null) => ReactNode);
  loadingComponent?: ReactNode;
}

export function AuthWrapper({ 
  children, 
  // loadingComponent = <Spinner label="Loading..." /> 
}: AuthWrapperProps) {
  const { user, loading } = useAuth();

  // if (loading) {
  //   return loadingComponent;
  // }

  // Check if children is a function
  if (typeof children === 'function') {
    return <>{children(user)}</>;
  }

  // If children is not a function, render it directly
  return <>{children}</>;
}