'use client';
import React from 'react';
import { AuthWrapper } from '@/app/auth/callback/AuthWrapper';
import { AuthUser } from '@/app/hooks/useAuth';

const ProfilePage = () => {
  return (
    <AuthWrapper>
      {(user: AuthUser | null) => (
        <div>
          {user ? (
            <div>
              <p>Welcome, {user.email}</p>
              <p>Name: {user.name}</p>
              {user.avatar_url && (
                <img src={user.avatar_url} alt="User Avatar" />
              )}
            </div>
          ) : (
            <p>Please log in</p>
          )}
        </div>
      )}
    </AuthWrapper>
  );
};

export default ProfilePage;