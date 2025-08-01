import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './use-auth';

export const useOnboardingRedirect = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Don't redirect while loading
        if (isLoading) return;

        // If user is authenticated but doesn't have a companyId, redirect to onboarding
        if (user && !user.companyId) {
            router.push('/onboarding');
        }
    }, [user, isLoading, router]);

    return {
        needsOnboarding: user && !user.companyId,
        isLoading,
    };
};
