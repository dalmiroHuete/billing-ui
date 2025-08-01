import React from 'react';
import { useOnboardingContext } from '@/app/hooks/use-onboarding-context';
import PaymentDrawer from "@/app/components/payment-drawer/payment-drawer";

const PaymentDrawerWrapper: React.FC = () => {
    const {
        isPaymentDrawerOpen,
        selectedPlan,
        setIsPaymentDrawerOpen,
        handlePaymentSubmit
    } = useOnboardingContext();

    return (
        <PaymentDrawer
            isOpen={isPaymentDrawerOpen}
            onClose={() => setIsPaymentDrawerOpen(false)}
            selectedPlan={selectedPlan}
            onSubmit={handlePaymentSubmit}
            error={null}
        />
    );
};

export default PaymentDrawerWrapper;
