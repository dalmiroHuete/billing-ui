import React from 'react';
import { Box, HStack, Text, Progress, VStack, Button } from '@chakra-ui/react';
import Form from '@/app/components/form/form';
import Feedback from '@/app/components/feedback/feedback';
import {companyFields, PLAN_OPTIONS} from '@/app/utils/constants/constants';
import { useOnboardingContext } from '@/app/hooks/use-onboarding-context';
import PlanSelector from "@/app/components/plan-selector/plan-selector";

interface Step {
    number: number;
    title: string;
}

interface WizardProps {
    steps: Step[];
}

const Wizard: React.FC<WizardProps> = ({ steps }) => {
    const {
        currentStep,
        selectedPlan,
        formError,
        successMessage,
        handleCompanySubmit,
        handlePlanSelect,
        handlePlanSubmit
    } = useOnboardingContext();

    const progressValue = (currentStep / steps.length) * 100;

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <VStack spacing={6} align="stretch">
                        <Feedback message={formError} type="error" />
                        <Form
                            formDefinition={companyFields}
                            type="signup"
                            onSubmitCallback={handleCompanySubmit}
                            submitText="Continue"
                        />
                    </VStack>
                );
            case 2:
                return (
                    <VStack spacing={6} align="stretch">
                        <Feedback message={formError} type="error" />
                        <Feedback message={successMessage} type="success" />

                        <PlanSelector
                            plans={PLAN_OPTIONS}
                            selectedPlan={selectedPlan}
                            onPlanSelect={handlePlanSelect}
                        />

                        <Button
                            variant="gradient"
                            size="lg"
                            onClick={handlePlanSubmit}
                            isDisabled={!selectedPlan}
                        >
                            Continue to Payment
                        </Button>
                    </VStack>
                );
            default:
                return null;
        }
    };

    return (
        <Box w="full">
            <Box w="full" maxW="md" mb={8}>
                <HStack justify="space-between" mb={2}>
                    {steps.map((step) => (
                        <Text
                            key={step.number}
                            fontSize="sm"
                            fontWeight={currentStep >= step.number ? "bold" : "normal"}
                            color={currentStep >= step.number ? "brand.primary" : "gray.400"}
                        >
                            {step.title}
                        </Text>
                    ))}
                </HStack>
                <Progress
                    value={progressValue}
                    colorScheme="green"
                    size="sm"
                    borderRadius="full"
                />
            </Box>

            {renderStepContent()}
        </Box>
    );
};

export default Wizard;
