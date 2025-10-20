/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          'Inter',
          'Noto Sans KR',
          'ui-sans-serif',
          'system-ui',
          'Apple SD Gothic Neo',
          'AppleGothic',
          'Malgun Gothic',
          'Montserrat',
          'Lato',
          'sans-serif',
        ],
        premium: [
          'Montserrat',
          'Pretendard',
          'Inter',
          'Noto Sans KR',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        primary: '#2563eb', // 파란색 - 신뢰감
        secondary: '#10b981', // 초록색 - 안정감
        accent: '#f59e0b', // 주황색 - 주의집중
        danger: '#dc2626', // 빨간색 - 긴급상황
        'gray-bg': '#f8fafc',
        premium: {
          gold: '#FFD700',
          'gold-dark': '#C9A227',
          'deep-blue': '#1e293b',
          'midnight': '#0f172a',
          'platinum': '#e5e7eb',
          'gradient-start': '#2563eb',
          'gradient-end': '#10b981',
        },
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'premium': '2.5rem',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
        'section': '3.5rem',
        'card': '2.25rem',
      },
      fontSize: {
        'base': '18px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '36px',
        'display': '44px',
        'premium-title': '2.5rem',
      },
      boxShadow: {
        premium: '0 8px 32px 0 rgba(37,99,235,0.18), 0 1.5px 6px 0 rgba(0,0,0,0.08)',
        gold: '0 4px 24px 0 rgba(255,215,0,0.18)',
        'soft-xl': '0 6px 24px 0 rgba(16,185,129,0.12)',
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
        'gradient-gold': 'linear-gradient(90deg, #FFD700 0%, #C9A227 100%)',
      },
      transitionProperty: {
        'spacing': 'margin, padding',
        'colors': 'color, background-color, border-color',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) both',
        'bounce-premium': 'bounce 1.2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

