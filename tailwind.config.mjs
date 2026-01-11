/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
                mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                // We can define custom tokens here if needed, but Tailwind's Zinc/Indigo is great.
                // Let's alias primary to Indigo for semantic usage
                primary: defaultTheme.colors.indigo,
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        maxWidth: '65ch',
                        color: theme('colors.zinc.700'),
                        a: {
                            color: theme('colors.indigo.600'),
                            '&:hover': {
                                color: theme('colors.indigo.500'),
                            },
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                    },
                },
                invert: {
                    css: {
                        color: theme('colors.zinc.300'),
                        a: {
                            color: theme('colors.indigo.400'),
                            '&:hover': {
                                color: theme('colors.indigo.300'),
                            },
                        },
                    }
                }
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms')
    ],
}
