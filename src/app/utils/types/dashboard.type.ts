export type PlanType = 'PAY_AS_YOU_GO' | 'PREPAID' | 'SEATS';

export interface DashboardProjectDto {
    id: string;
    title: string;
    description?: string;
}

export interface DashboardResponse {
    planType: PlanType;
    credits: number;
    seats: number;
    projects: DashboardProjectDto[];
} 