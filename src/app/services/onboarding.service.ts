import { OnboardingData, PaymentData, SetupOnboardingResponse, PaymentResponse, ConfirmPaymentResponse } from "@/app/utils/types/onboarding.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class OnboardingService {
    static async setupOnboarding(data: OnboardingData, token: string): Promise<SetupOnboardingResponse> {
        const response = await fetch(`${API_BASE_URL}/onboarding`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            throw new Error(`Failed to create company: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Company created successfully:', result);
        return result;
    }

    static async createPayment(data: PaymentData, token: string): Promise<PaymentResponse> {
        const response = await fetch(`${API_BASE_URL}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to create payment');
        }

        return response.json();
    }

    static async confirmPayment(paymentId: string, token: string): Promise<ConfirmPaymentResponse> {
        const response = await fetch(`${API_BASE_URL}/payment/${paymentId}/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to confirm payment');
        }

        return response.json();
    }
}
