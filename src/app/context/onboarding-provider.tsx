'use client';

import React, { ReactNode, useState } from "react";
import { OnboardingContext, OnboardingContextType } from "@/app/context/onboarding-context";
import { useOnboarding } from '@/app/hooks/onboarding-api';
import { Company, PlanOption, PaymentReason } from '@/app/utils/types/onboarding.type';
import {getPaymentReasonForPlan} from "@/app/utils/helpers/onboarding.helper";
import { useAuth } from '@/app/hooks/use-auth';

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
    const { refetch } = useAuth();

    // State
    const [currentStep, setCurrentStep] = useState(1);
    const [companyData, setCompanyData] = useState<Company | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null);
    const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // API hooks
    const {
        setupOnboarding,
        createPayment,
        confirmPayment,
    } = useOnboarding();


    // Business Logic
    const handleCompanySubmit = (values: Record<string, never>) => {
        setFormError("");
        const company: Company = {
            name: values.name as string,
            description: values.description as string
        };
        setCompanyData(company);
        setCurrentStep(2);
    };

    const handlePlanSelect = (plan: PlanOption) => {
        setSelectedPlan(plan);
    };

    const handlePlanSubmit = () => {
        if (!selectedPlan) {
            setFormError("Please select a plan");
            return;
        }
        setIsPaymentDrawerOpen(true);
    };

    const handlePaymentSubmit = async () => {
        if (!companyData || !selectedPlan) return;

        try {
            setIsLoading(true);
            setError(null);

            // Step 1: Create company
            const companyResponse = await setupOnboarding({
                company: companyData,
                plan: {
                    type: selectedPlan.type,
                    credits: selectedPlan.credits,
                    seats: selectedPlan.seats
                }
            });

            if (selectedPlan.type !== 'PAY_AS_YOU_GO') {
                const paymentData = {
                    companyId: companyResponse.company.id,
                    amount: selectedPlan.price,
                    reason: getPaymentReasonForPlan(selectedPlan.type) as PaymentReason,
                };

                // step 2: create payment
                const paymentResponse = await createPayment(paymentData);

                // step 3: confirm payment
                await confirmPayment(paymentResponse.paymentId);
            }

            // step 4: Update user profile
            setIsPaymentDrawerOpen(false);
            setSuccessMessage('Onboarding completed successfully! Redirecting...');

            await refetch();

            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);

        } catch (error) {
            console.error('Onboarding submission failed:', error);
            setError(error instanceof Error ? error.message : 'Onboarding failed');
        } finally {
            setIsLoading(false);
        }
    };

    const value: OnboardingContextType = {
        // State
        currentStep,
        companyData,
        selectedPlan,
        isPaymentDrawerOpen,
        formError,
        successMessage,
        isLoading,
        error,

        // Actions
        setCurrentStep,
        setCompanyData,
        setSelectedPlan,
        setIsPaymentDrawerOpen,
        setFormError,
        setSuccessMessage,
        setIsLoading,
        setError,

        // Business Logic
        handleCompanySubmit,
        handlePlanSelect,
        handlePlanSubmit,
        handlePaymentSubmit,
    };

    return (
        <OnboardingContext.Provider value={value}>
            {children}
        </OnboardingContext.Provider>
    );
};
