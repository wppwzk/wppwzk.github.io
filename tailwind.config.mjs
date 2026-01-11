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
                // Promote Mono for headings for that dev feel
                heading: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                primary: defaultTheme.colors.indigo,
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
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
                typing: {
                    from: { width: '0' },
                    to: { width: '100%' },
                },
                blink: {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: 'rgb(99 102 241)' }, // indigo-500
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        maxWidth: '65ch',
                        color: theme('colors.zinc.700'),
                        fontFamily: theme('fontFamily.sans').join(','),
                        h1: {
                            fontFamily: theme('fontFamily.heading').join(','),
                        },
                        h2: {
                            fontFamily: theme('fontFamily.heading').join(','),
                        },
                        h3: {
                            fontFamily: theme('fontFamily.heading').join(','),
                        },
                        code: {
                            fontFamily: theme('fontFamily.mono').join(','),
                            backgroundColor: theme('colors.zinc.100'),
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25rem',
                            fontWeight: '400',
                        },
                        'code::before': { content: '""' },
                        'code::after': { content: '""' },
                        a: {
                            color: theme('colors.indigo.600'),
                            textDecoration: 'none',
                            borderBottom: '1px solid transparent',
                            transition: 'border-color 0.2s',
                            '&:hover': {
                                borderBottomColor: theme('colors.indigo.600'),
                            },
                        },
                    },
                },
                invert: {
                    css: {
                        color: theme('colors.zinc.300'),
                        code: {
                            backgroundColor: theme('colors.zinc.800'),
                        },
                        a: {
                            color: theme('colors.indigo.400'),
                            '&:hover': {
                                borderBottomColor: theme('colors.indigo.400'),
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
