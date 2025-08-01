import React from 'react';
import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react';
import { PlanOption } from '@/app/utils/types/onboarding.type';

interface PlanSelectorProps {
    plans: PlanOption[];
    selectedPlan: PlanOption | null;
    onPlanSelect: (plan: PlanOption) => void;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ plans, selectedPlan, onPlanSelect }) => {
    return (
        <VStack spacing={6} w="full">
            <Text fontSize="xl" fontWeight="bold" color="gray.900" textAlign="center">
                Select Your Billing Plan
            </Text>
            <Text fontSize="md" color="gray.500" textAlign="center" mb={4}>
                Choose the plan that best fits your company&#39;s needs
            </Text>
            <Text color="gray.500" fontSize="md" fontStyle="italic" textAlign="center">
                This is just a POC. The plans use default prices and quantities, ideally the credits and seats should scale, but due to time this was kept limited
            </Text>

            <VStack spacing={4} w="full">
                {plans.map((plan) => (
                    <Box
                        key={plan.id}
                        w="full"
                        p={6}
                        border="2px solid"
                        borderColor={selectedPlan?.id === plan.id ? "brand.primary" : "gray.200"}
                        borderRadius="xl"
                        bg={selectedPlan?.id === plan.id ? "brand.light" : "white"}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{
                            borderColor: "brand.primary",
                            bg: "brand.light"
                        }}
                        onClick={() => onPlanSelect(plan)}
                    >
                        <VStack spacing={4} align="stretch">
                            <HStack justify="space-between" align="flex-start">
                                <VStack align="flex-start" spacing={2}>
                                    <Text fontSize="lg" fontWeight="bold" color="gray.900">
                                        {plan.title}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                        {plan.description}
                                    </Text>
                                </VStack>
                                <Badge
                                    colorScheme={selectedPlan?.id === plan.id ? "green" : "gray"}
                                    variant="solid"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    ${plan.price}
                                </Badge>
                            </HStack>

                            <VStack spacing={2} align="flex-start">
                                {plan.features.map((feature, index) => (
                                    <HStack key={index} spacing={2}>
                                        <Box
                                            w={2}
                                            h={2}
                                            bg="brand.primary"
                                            borderRadius="full"
                                            flexShrink={0}
                                        />
                                        <Text fontSize="sm" color="gray.600">
                                            {feature}
                                        </Text>
                                    </HStack>
                                ))}
                            </VStack>
                        </VStack>
                    </Box>
                ))}
            </VStack>
        </VStack>
    );
};

export default PlanSelector;
