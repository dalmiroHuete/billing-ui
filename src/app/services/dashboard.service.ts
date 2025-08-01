import { DashboardResponse } from '@/app/utils/types/dashboard.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class DashboardService {
    static async getDashboardData(companyId: string): Promise<DashboardResponse> {
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/dashboard?companyId=${companyId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch dashboard data');
        }

        return response.json();
    }
} 