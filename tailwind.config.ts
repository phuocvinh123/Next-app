import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(180deg, #E5EFFF 0%, rgba(229, 239, 255, 0.26) 83.7%, rgba(229, 239, 255, 0.00) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
