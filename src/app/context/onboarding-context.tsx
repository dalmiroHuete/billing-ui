import { createContext } from "react";
import { Company, PlanOption } from "@/app/utils/types/onboarding.type";

export interface OnboardingContextType {
    // State
    currentStep: number;
    companyData: Company | null;
    selectedPlan: PlanOption | null;
    isPaymentDrawerOpen: boolean;
    formError: string;
    successMessage: string;
    isLoading: boolean;
    error: string | null;

    // Actions
    setCurrentStep: (step: number) => void;
    setCompanyData: (company: Company | null) => void;
    setSelectedPlan: (plan: PlanOption | null) => void;
    setIsPaymentDrawerOpen: (isOpen: boolean) => void;
    setFormError: (error: string) => void;
    setSuccessMessage: (message: string) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Business Logic
    handleCompanySubmit: (values: Record<string, never>) => void;
    handlePlanSelect: (plan: PlanOption) => void;
    handlePlanSubmit: () => void;
    handlePaymentSubmit: () => Promise<void>;

}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);
