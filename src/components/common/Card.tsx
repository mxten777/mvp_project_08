
const variants = {
  default:
    'bg-white text-gray-900 shadow-premium border-2 border-gray-200 hover:border-blue-300',
  primary:
    'bg-gradient-premium text-white shadow-premium border-2 border-blue-400',
  accent:
    'bg-gradient-to-r from-premium-gold to-premium-gold-dark text-white shadow-gold border-2 border-yellow-400',
  danger:
    'bg-danger text-white shadow-lg border-2 border-red-400',
};
import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'accent' | 'danger';
}


const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  return (
    <div
      className={`rounded-2xl p-5 md:p-8 font-premium transition-all duration-200 hover:shadow-xl ${variants[variant]} ${className}`}
      role="region"
      aria-label="카드"
      tabIndex={0}
      style={{
        fontFamily: 'Montserrat, Pretendard, Inter, Noto Sans KR, sans-serif',
        letterSpacing: '0.01em',
        backgroundClip: 'padding-box',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
};

export default Card;
