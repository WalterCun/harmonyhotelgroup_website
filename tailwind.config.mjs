/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FBF8E6',
                    100: '#F7F1CE',
                    200: '#EFE39D',
                    300: '#E8D56C',
                    400: '#E0C83A',
                    500: '#D4AF37', // Primary gold
                    600: '#AA8C2C',
                    700: '#7F6921',
                    800: '#554616',
                    900: '#2A230B',
                },
                secondary: {
                    50: '#E6F9F9',
                    100: '#CCF3F3',
                    200: '#99E7E7',
                    300: '#66DBDB',
                    400: '#33CFCF',
                    500: '#008080', // Secondary teal
                    600: '#006666',
                    700: '#004D4D',
                    800: '#003333',
                    900: '#001A1A',
                },
                neutral: {
                    50: '#F8F9FA',
                    100: '#E9ECEF',
                    200: '#DEE2E6',
                    300: '#CED4DA',
                    400: '#ADB5BD',
                    500: '#6C757D',
                    600: '#495057',
                    700: '#343A40',
                    800: '#212529',
                    900: '#121416',
                },
                success: {
                    500: '#28A745',
                },
                warning: {
                    500: '#FFC107',
                },
                error: {
                    500: '#DC3545',
                },
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};