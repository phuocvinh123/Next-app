import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: () => ({
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        inherit: 'inherit',
        current: 'currentColor',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        green: '#70C217',
        purple: '#7854F7',
      }),
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(180deg, #E5EFFF 0%, rgba(229, 239, 255, 0.26) 83.7%, rgba(229, 239, 255, 0.00) 100%)',
        'testimonial-background':
          'linear-gradient(180deg, rgba(236, 240, 253, 0.00) 0%, rgba(236, 240, 253, 0.53) 14.32%, #ECF0FD 45.83%, rgba(236, 240, 253, 0.43) 84.33%, rgba(236, 240, 253, 0.00) 100%)',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
export default config
