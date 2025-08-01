import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    colors: {
        brand: {
            primary: '#1a5f3c',
            secondary: '#2d7a4f',
            accent: '#4a9c6b',
            light: '#e8f5e8',
        },
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        }
    },
    fonts: {
        heading: 'Georgia, serif',
        body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'brand',
            },
            variants: {
                gradient: {
                    bgGradient: 'linear(to-r, brand.primary, brand.secondary)',
                    color: 'white',
                    _hover: {
                        bgGradient: 'linear(to-r, brand.secondary, brand.accent)',
                    },
                },
            },
        },
        Input: {
            defaultProps: {
                focusBorderColor: 'brand.primary',
            },
            variants: {
                filled: {
                    field: {
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'brand.light',
                        borderRadius: 'lg',
                        _focus: {
                            borderColor: 'brand.primary',
                            boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
                        },
                    },
                },
            },
        },
    },
    styles: {
        global: {
            body: {
                bg: 'white',
                color: 'gray.800',
            },
        },
    },
});

export default theme;
