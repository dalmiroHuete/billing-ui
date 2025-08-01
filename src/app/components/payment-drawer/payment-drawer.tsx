import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    HStack,
    Text,
    Divider,
    Box
} from '@chakra-ui/react';
import { PlanOption } from '@/app/utils/types/onboarding.type';
import Form from '@/app/components/form/form';
import { paymentFields } from '@/app/utils/constants/constants';
import Feedback from '@/app/components/feedback/feedback';

interface PaymentDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPlan: PlanOption | null;
    onSubmit: () => void;
    error: string | null;
}

const PaymentDrawer: React.FC<PaymentDrawerProps> = ({
    isOpen,
    onClose,
    selectedPlan,
    onSubmit,
    error
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = (values: Record<string, never>) => {
        if (!selectedPlan) return;
        onSubmit();
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                    <VStack spacing={2} align="stretch">
                        <Text fontSize="xl" fontWeight="bold" color="gray.900">
                            Complete Payment
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            Enter your credit card information
                        </Text>
                    </VStack>
                </DrawerHeader>

                <DrawerBody>
                    <VStack spacing={6} align="stretch">
                        {selectedPlan && (
                            <Box
                                p={4}
                                bg="brand.light"
                                borderRadius="lg"
                                border="1px solid"
                                borderColor="brand.primary"
                            >
                                <VStack spacing={2} align="stretch">
                                    <HStack justify="space-between">
                                        <Text fontSize="md" fontWeight="medium" color="gray.900">
                                            Selected Plan:
                                        </Text>
                                        <Text fontSize="md" fontWeight="bold" color="brand.primary">
                                            {selectedPlan.title}
                                        </Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontSize="sm" color="gray.600">
                                            Total to pay:
                                        </Text>
                                        <Text fontSize="lg" fontWeight="bold" color="gray.900">
                                            ${selectedPlan.price}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </Box>
                        )}

                        <Divider />


                        <VStack spacing={4} align="stretch">
                            <Text fontSize="lg" fontWeight="medium" color="gray.900">
                                Payment Information
                            </Text>

                            {error && <Feedback message={error} type="error" />}

                            <Form
                                formDefinition={paymentFields}
                                type="payment"
                                onSubmitCallback={handleSubmit}
                                submitText="Pay"
                            />
                        </VStack>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default PaymentDrawer;
