import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ChakraProvider} from '@chakra-ui/react'
import Feedback from '../feedback'

// Mock theme for Chakra UI
const mockTheme = {
    colors: {
        green: {
            500: '#48BB78',
        },
        red: {
            500: '#F56565',
        },
        blue: {
            500: '#4299E1',
        },
    },
}

const renderWithChakra = (component: React.ReactElement) => {
    return render(
        <ChakraProvider theme={mockTheme as never}>
            {component}
        </ChakraProvider>
    )
}

describe('Feedback Component', () => {
    it('should render success message when type is success', () => {
        const message = 'Success message'
        renderWithChakra(<Feedback type="success" message={message}/>)

        expect(screen.getByText(message)).toBeInTheDocument()
        expect(screen.getByRole('alert')).toHaveAttribute('data-status', 'success')
    })

    it('should render error message when type is error', () => {
        const message = 'Error message'
        renderWithChakra(<Feedback type="error" message={message}/>)

        expect(screen.getByText(message)).toBeInTheDocument()
        expect(screen.getByRole('alert')).toHaveAttribute('data-status', 'error')
    })

    it('should render multiple error messages when message contains newlines', () => {
        const messages = ['Error 1', 'Error 2', 'Error 3']
        renderWithChakra(<Feedback type="error" message={messages.join('\n')}/>)

        // Check that the combined message is rendered
        expect(screen.getByText(/Error 1.*Error 2.*Error 3/)).toBeInTheDocument()
    })

    it('should render multiple success messages when message contains newlines', () => {
        const messages = ['Success 1', 'Success 2']
        renderWithChakra(<Feedback type="success" message={messages.join('\n')}/>)

        // Check that the combined message is rendered
        expect(screen.getByText(/Success 1.*Success 2/)).toBeInTheDocument()
    })

    it('should not render when message is empty', () => {
        renderWithChakra(<Feedback type="success" message=""/>)

        // Component should not render when message is empty
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should not render when message is null', () => {
        renderWithChakra(<Feedback type="error" message={null as never}/>)

        // Component should not render when message is null
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should not render when message is undefined', () => {
        renderWithChakra(<Feedback type="error" message={undefined as never}/>)

        // Component should not render when message is undefined
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

})
