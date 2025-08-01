import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@/app/services/auth.service';

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: AuthService.getUserProfile,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 3,
    });
};
