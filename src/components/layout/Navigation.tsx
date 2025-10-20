import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, Calendar, UtensilsCrossed, User } from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  onNavigate?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const navItems = [
    {
      path: '/',
      icon: Home,
      label: '홈',
      description: '메인 화면'
    },
    {
      path: '/welfare',
      icon: Heart,
      label: '복지정보',
      description: '복지 혜택 안내'
    },
    {
      path: '/schedule',
      icon: Calendar,
      label: '일정표',
      description: '복지관 일정'
    },
    {
      path: '/menu',
      icon: UtensilsCrossed,
      label: '식단표',
      description: '오늘의 식단'
    },
    {
      path: '/profile',
      icon: User,
      label: '내정보',
      description: '개인 설정'
    }
  ];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <nav
      className="bg-white shadow-sm md:rounded-none md:shadow-none md:min-h-screen md:w-full w-full fixed md:static bottom-0 left-0 right-0 z-40 flex md:flex-col flex-row md:py-6 md:px-4 py-3 px-2 border-t md:border-t-0 border-gray-200"
      role="navigation"
      aria-label="주요 메뉴"
    >
      <div className="flex md:flex-col flex-row gap-1 md:gap-4 w-full justify-between md:justify-start" role="menubar">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-1 md:flex-none flex-col md:flex-row items-center gap-1 md:gap-3 px-1 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-lg font-semibold transition-colors duration-150 min-h-[52px] md:min-h-[56px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 select-none
                ${isActive ? 'bg-blue-100 text-blue-700 font-bold shadow-md' : 'text-gray-800 hover:bg-blue-50 hover:text-blue-600'}`
              }
              onClick={() => {
                speakText(`${item.label} 페이지로 이동`);
                onNavigate?.();
              }}
              aria-label={`${item.label} - ${item.description}`}
              role="menuitem"
              tabIndex={0}
            >
              {({ isActive }) => (
                <>
                  <div className="text-xl md:text-2xl" aria-hidden="true">
                    <IconComponent size={window.innerWidth < 768 ? 20 : 24} />
                  </div>
                  <span className="text-center leading-tight">{item.label}</span>
                  {isActive && <span style={{display:'none'}} aria-current="page"></span>}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
