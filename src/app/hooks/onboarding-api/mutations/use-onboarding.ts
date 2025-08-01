import { useMutation } from '@tanstack/react-query';
import { OnboardingService } from '@/app/services/onboarding.service';
import { OnboardingData, PaymentData } from '@/app/utils/types/onboarding.type';

export const useOnboarding = () => {
    const getToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth_token');
        }
        return null;
    };

    const setupOnboardingMutation = useMutation({
        mutationFn: (data: OnboardingData) => {
            const token = getToken();
            if (!token) {
                throw new Error('No authentication token found');
            }
            return OnboardingService.setupOnboarding(data, token);
        },
        onSuccess: (data) => {
            console.log('Company created successfully:', data);
        },
        onError: (error) => {
            console.error('Failed to create company:', error);
        },
    });

    const createPaymentMutation = useMutation({
        mutationFn: (data: PaymentData) => {
            const token = getToken();
            if (!token) {
                throw new Error('No authentication token found');
            }
            return OnboardingService.createPayment(data, token);
        },
        onSuccess: (data) => {
            console.log('Payment created successfully:', data);
        },
        onError: (error) => {
            console.error('Failed to create payment:', error);
        },
    });

    const confirmPaymentMutation = useMutation({
        mutationFn: (paymentId: string) => {
            const token = getToken();
            if (!token) {
                throw new Error('No authentication token found');
            }
            return OnboardingService.confirmPayment(paymentId, token);
        },
        onSuccess: (data) => {
            console.log('Payment confirmed successfully:', data);
        },
        onError: (error) => {
            console.error('Failed to confirm payment:', error);
        },
    });

    return {
        setupOnboarding: setupOnboardingMutation.mutateAsync,
        createPayment: createPaymentMutation.mutateAsync,
        confirmPayment: confirmPaymentMutation.mutateAsync,
        isSettingUpOnboarding: setupOnboardingMutation.isPending,
        isCreatingPayment: createPaymentMutation.isPending,
        isConfirmingPayment: confirmPaymentMutation.isPending,
        setupOnboardingError: setupOnboardingMutation.error,
        createPaymentError: createPaymentMutation.error,
        confirmPaymentError: confirmPaymentMutation.error,
    };
};
