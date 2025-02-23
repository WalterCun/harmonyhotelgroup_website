/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gold: {
                    600: '#B8860B',
                    700: '#966F09'
                }
            }
        },
    },
    plugins: [],
};