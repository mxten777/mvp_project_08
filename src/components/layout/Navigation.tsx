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
    <nav className="navigation" role="navigation" aria-label="주요 메뉴">
      <div className="nav-container">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item--active' : ''}`
              }
              onClick={() => {
                speakText(`${item.label} 페이지로 이동`);
                onNavigate?.(); // 모바일 메뉴 닫기
              }}
              aria-label={`${item.label} - ${item.description}`}
            >
              <div className="nav-icon">
                <IconComponent size={24} />
              </div>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
