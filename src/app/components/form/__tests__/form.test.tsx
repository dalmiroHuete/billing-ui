import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import Form from '../form';
import {FormField} from '@/app/utils/types/form-field.type';

describe('Form component', () => {
    const formDefinition: FormField[] = [
        {name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email', required: true},
        {name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password', required: true},
    ];

    const renderWithChakra = (ui: React.ReactElement) =>
        render(<ChakraProvider>{ui}</ChakraProvider>);

    it('should render all form fields and submit button when form definition is provided', () => {
        renderWithChakra(
            <Form formDefinition={formDefinition} type="login" onSubmitCallback={jest.fn()}/>
        );
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
    });

    it('should show required error messages when user submits empty form', async () => {
        renderWithChakra(
            <Form formDefinition={formDefinition} type="login" onSubmitCallback={jest.fn()}/>
        );
        fireEvent.click(screen.getByRole('button', {name: /sign in/i}));
        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    it('should call onSubmitCallback with form values when user submits valid form', async () => {
        const onSubmitCallback = jest.fn();
        renderWithChakra(
            <Form formDefinition={formDefinition} type="login" onSubmitCallback={onSubmitCallback}/>
        );
        fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'test@example.com'}});
        fireEvent.change(screen.getByLabelText('Password'), {target: {value: '123456'}});
        fireEvent.click(screen.getByRole('button', {name: /sign in/i}));
        await waitFor(() => {
            expect(onSubmitCallback).toHaveBeenCalledWith({email: 'test@example.com', password: '123456'});
        });
    });

    it('should show custom submit text when submitText prop is provided', () => {
        renderWithChakra(
            <Form formDefinition={formDefinition} type="login" onSubmitCallback={jest.fn()} submitText="Log In"/>
        );
        expect(screen.getByRole('button', {name: /log in/i})).toBeInTheDocument();
    });

    it('should show loading state when user submits form', async () => {
        const onSubmitCallback = jest.fn(() => new Promise(res => setTimeout(res, 100)));
        renderWithChakra(
            <Form formDefinition={formDefinition} type="login" onSubmitCallback={onSubmitCallback}/>
        );
        fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'test@example.com'}});
        fireEvent.change(screen.getByLabelText('Password'), {target: {value: '123456'}});
        fireEvent.click(screen.getByRole('button', {name: /sign in/i}));
        expect(screen.getByRole('button', {name: /sign in/i})).toBeDisabled();
    });
});
