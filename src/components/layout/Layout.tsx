import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Header from './Header.tsx';
import Navigation from './Navigation.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? Number(saved) : 18;
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem('highContrast');
    return saved === 'true';
  });
  const [ariaLiveMsg, setAriaLiveMsg] = useState('');

  useEffect(() => {
    document.body.style.fontSize = fontSize + 'px';
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 메뉴 오픈 시 body 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // 포커스 이동 시 TTS/aria-live 안내 (전역)
  useEffect(() => {
    const handler = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.getAttribute('aria-label')) {
        const msg = target.getAttribute('aria-label')!;
        setAriaLiveMsg(msg);
        if ('speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance(msg);
          utter.lang = 'ko-KR';
          utter.rate = 0.8;
          speechSynthesis.speak(utter);
        }
      }
    };
    window.addEventListener('focusin', handler);
    return () => window.removeEventListener('focusin', handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 접근성 안내 메시지 */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{ariaLiveMsg}</div>
      
      {/* 헤더 - 전체 상단 고정 */}
      <Header
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isMenuOpen}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={closeMenu}
        >
          <div 
            className="bg-white w-72 max-w-[85vw] shadow-xl animate-in slide-in-from-left duration-300 overflow-y-auto rounded-r-2xl"
            style={{ 
              marginTop: '140px',
              height: 'calc(100vh - 140px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center border-b border-gray-200 pb-3">메뉴</h3>
              <div className="flex flex-col space-y-2">
                <Navigation onNavigate={closeMenu} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 relative">
        {/* 데스크탑 사이드바 네비게이션 */}
        <aside className="hidden md:block w-72 bg-white shadow-lg border-r border-gray-200 flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto pt-6">
            <nav className="flex flex-col gap-3 px-6">
              {[
                { path: '/', icon: '🏠', label: '홈', description: '메인 화면' },
                { path: '/welfare', icon: '❤️', label: '복지정보', description: '복지 혜택 안내' },
                { path: '/schedule', icon: '📅', label: '일정표', description: '복지관 일정' },
                { path: '/menu', icon: '🍽️', label: '식단표', description: '오늘의 식단' },
                { path: '/profile', icon: '👤', label: '내정보', description: '개인 설정' }
              ].map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl text-lg font-semibold transition-colors duration-150 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  aria-label={`${item.label} - ${item.description}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 min-w-0 pt-4 md:pt-8 pb-20 md:pb-8 px-4 md:px-8">
          <div className="w-full max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <Navigation />
      </div>
    </div>
  );
};

export default Layout;
