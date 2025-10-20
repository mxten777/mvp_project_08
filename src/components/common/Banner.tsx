import React from 'react';
import type { ReactNode } from 'react';

interface BannerProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'danger' | 'info';
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const colorMap = {
  primary: 'bg-gradient-premium text-white shadow-premium',
  secondary: 'bg-gradient-to-r from-premium-gold to-premium-gold-dark text-white shadow-gold',
  accent: 'bg-gradient-to-r from-accent to-yellow-400 text-white shadow-lg',
  danger: 'bg-danger text-white shadow-lg',
  info: 'bg-blue-100 text-blue-800 shadow-md',
};

const Banner: React.FC<BannerProps> = ({
  children,
  color = 'info',
  icon,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`w-full flex items-center gap-3 rounded-2xl px-6 py-4 font-premium text-lg shadow-premium transition-all duration-200 ${colorMap[color]} ${onClick ? 'cursor-pointer hover:opacity-90 focus:ring-2 focus:ring-primary focus:ring-offset-2' : ''} ${className}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? 'button' : 'region'}
      aria-label="배너"
      style={{
        fontFamily: 'Montserrat, Pretendard, Inter, Noto Sans KR, sans-serif',
        letterSpacing: '0.01em',
      }}
    >
      {icon && <span className="text-2xl mr-2">{icon}</span>}
      <div className="flex-1 font-semibold">{children}</div>
    </div>
  );
};

export default Banner;
