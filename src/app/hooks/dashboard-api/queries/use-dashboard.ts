import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '@/app/services/dashboard.service';

export const useDashboard = (companyId: string) => {
    return useQuery({
        queryKey: ['dashboard', companyId],
        queryFn: () => DashboardService.getDashboardData(companyId),
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
        retry: 3,
        enabled: !!companyId, // Only run query if companyId is provided
    });
}; 