import React from 'react';
import type { ReactNode } from 'react';

interface NotificationCardProps {
  title: string;
  content: string;
  time?: string;
  priority?: 'normal' | 'high';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  content,
  time,
  priority = 'normal',
  icon,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`flex items-start gap-4 rounded-2xl p-5 md:p-7 font-premium shadow-premium cursor-pointer transition-all border-l-4 ${
        priority === 'high' ? 'border-danger bg-gradient-to-r from-red-100 to-red-50' : 'border-primary bg-gradient-premium/10'
      } hover:shadow-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={title + ' ' + content}
      style={{
        fontFamily: 'Montserrat, Pretendard, Inter, Noto Sans KR, sans-serif',
        letterSpacing: '0.01em',
      }}
    >
      {icon && (
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${priority === 'high' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-xl font-bold mb-1 text-gray-900">{title}</h4>
        <p className="text-gray-700 mb-2 leading-relaxed text-lg">{content}</p>
        {time && <span className="text-base text-gray-500">{time}</span>}
      </div>
    </div>
  );
};

export default NotificationCard;
