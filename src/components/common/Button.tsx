import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'md' | 'lg';
}

const base =
  'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none font-premium shadow-premium text-shadow-sm';

const variants = {
  primary:
    'bg-gradient-premium text-white border-0 hover:shadow-xl active:scale-95',
  secondary:
    'bg-gradient-to-r from-premium-gold to-premium-gold-dark text-white border-0 hover:shadow-gold active:scale-95',
  danger:
    'bg-danger text-white border-0 hover:bg-red-700 active:bg-red-800 shadow-lg',
  outline:
    'bg-white text-primary border-2 border-primary hover:bg-blue-50',
};

const sizes = {
  md: 'text-base md:text-lg px-4 md:px-7 py-3 md:py-3.5 min-w-[56px] md:min-w-[56px] min-h-[56px] md:min-h-[56px]',
  lg: 'text-lg md:text-xl px-6 md:px-10 py-4 md:py-5 min-w-[64px] md:min-w-[64px] min-h-[64px] md:min-h-[64px]',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      role="button"
      aria-label={typeof children === 'string' ? children : undefined}
      tabIndex={0}
      {...props}
      style={{
        fontFamily: 'Montserrat, Pretendard, Inter, Noto Sans KR, sans-serif',
        letterSpacing: '0.01em',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
