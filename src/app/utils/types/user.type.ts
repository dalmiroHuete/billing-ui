export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Company {
    id: string;
    name: string;
    description?: string;
}

export interface Plan {
    id: string;
    type: 'PAY_AS_YOU_GO' | 'PREPAID' | 'SEATS';
    credits: number;
    seats: number;
}

export interface UserSeat {
    seatNumber: number;
    isActive: boolean;
}

export interface UserProfileResponse {
    user: User;
    company?: Company;
    plan?: Plan;
    userSeat?: UserSeat;
}
