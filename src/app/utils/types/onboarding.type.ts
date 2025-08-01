export interface Company {
    name: string;
    description: string;
}

export interface Plan {
    type: 'PAY_AS_YOU_GO' | 'PREPAID' | 'SEATS';
    credits?: number;
    seats?: number;
}

export interface OnboardingData {
    company: Company;
    plan: Plan;
}

export enum PaymentReason {
    BUY_CREDITS = 'BUY_CREDITS',
    BUY_SEATS = 'BUY_SEATS',
    MONTHLY_SUBSCRIPTION = 'MONTHLY_SUBSCRIPTION',
}

export interface PaymentData {
    companyId: string;
    amount: number;
    reason: PaymentReason;
}

export interface PlanOption {
    id: string;
    type: 'PAY_AS_YOU_GO' | 'PREPAID' | 'SEATS';
    title: string;
    description: string;
    price: number;
    features: string[];
    credits?: number;
    seats?: number;
}

export interface SetupOnboardingResponse {
    message: string;
    company: {
        id: string;
        name: string;
        description?: string;
    };
    plan: {
        id: string;
        credits: number;
        seats: number;
    };
    seatNumber?: number;

}

export interface PaymentResponse {
    paymentId: string;
    status: string;
    amount: number;
    createdAt: string;
}

export interface ConfirmPaymentResponse {
    id: string;
    status: string;
    amount: number;
    confirmedAt: string;
}
