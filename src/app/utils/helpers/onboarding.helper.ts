import { PaymentReason } from '@/app/utils/types/onboarding.type';

export const getPaymentReasonForPlan = (planType: string): PaymentReason => {
    switch (planType) {
        case 'PAY_AS_YOU_GO':
            return PaymentReason.BUY_CREDITS;
        case 'PREPAID':
            return PaymentReason.BUY_CREDITS;
        case 'SEATS':
            return PaymentReason.BUY_SEATS;
        default:
            return PaymentReason.BUY_CREDITS;
    }
};
