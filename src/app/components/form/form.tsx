import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import {FormField} from "@/app/utils/types/form-field.type";

interface FormProps {
    formDefinition: FormField[];
    type: "signup" | "login" | "payment";
    onSubmitCallback: (values: Record<string, never>) => void;
    submitText?: string;
}

const Form: React.FC<FormProps> = ({
                                       formDefinition,
                                       type,
                                       onSubmitCallback,
                                       submitText
                                   }) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm();

    useEffect(() => {
        reset();
    }, [formDefinition, reset]);

    const onSubmit: SubmitHandler<Record<string, never>> = (values) => {
        onSubmitCallback(values);
    };

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={6} align="stretch">
                {formDefinition.map((field) => (
                    <FormControl key={field.name} isInvalid={!!errors[field.name]}>
                        <FormLabel color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                            {field.label}
                        </FormLabel>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder || field.label}
                            variant="filled"
                            size="lg"
                            {...register(field.name, {required: field.required})}
                        />
                        <FormErrorMessage>
                            {errors[field.name] && `${field.label} is required`}
                        </FormErrorMessage>
                    </FormControl>
                ))}

                <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    isLoading={isSubmitting}
                    width="full"
                    borderRadius="lg"
                    fontSize="md"
                    fontWeight="medium"
                    py={4}
                >
                    {submitText || (type === "signup" ? "Sign Up" : "Sign In")}
                </Button>
            </VStack>
        </Box>
    );
};

export default Form;
