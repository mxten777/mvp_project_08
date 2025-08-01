import React from 'react';
import type { ReactNode } from 'react';
import Header from './Header.tsx';
import Navigation from './Navigation.tsx';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
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
