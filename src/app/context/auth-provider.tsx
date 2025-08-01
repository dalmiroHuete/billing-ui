'use client';

import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, AuthContext } from './auth-context';
import { User } from '@/app/utils/types/user.type';
import { useUserProfile } from '@/app/hooks/auth-api/queries/use-user-profile';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { data: profileData, isLoading, error, refetch } = useUserProfile();

    // Update user data when profile data changes
    useEffect(() => {
        if (profileData?.user) {
            setUser(profileData.user);
        }
    }, [profileData]);

    const login = (data: { access_token: string; user: User }) => {
        localStorage.setItem('auth_token', data.access_token);
        setUser(data.user);
        refetch();
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isLoading,
        error,
        refetch,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
