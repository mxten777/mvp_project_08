import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Header from './Header.tsx';
import Navigation from './Navigation.tsx';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="layout">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      
      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <Navigation onNavigate={closeMenu} />
          </div>
        </div>
      )}
      
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
