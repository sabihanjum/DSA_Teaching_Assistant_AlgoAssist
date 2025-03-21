
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import DesktopNavMenu from './DesktopNavMenu';
import MobileMenu from './MobileMenu';
import HamburgerButton from './HamburgerButton';
import { NavLinkType } from './types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navLinks: NavLinkType[] = [
    { href: '/', label: 'Home' },
    { href: '/algorithms', label: 'Algorithms' },
    { href: '/data-structures', label: 'Data Structures' },
    { href: '/practice', label: 'Practice' },
  ];
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        {
          'bg-background/80 backdrop-blur-xl shadow-sm': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center text-foreground font-semibold text-xl tracking-tight"
        >
          <span className="font-bold">Algo</span>
          <span className="text-purple-500 font-bold">Assist</span>
        </Link>
        
        <DesktopNavMenu 
          navLinks={navLinks} 
          isAuthenticated={isAuthenticated} 
          onLogout={logout} 
        />
        
        <HamburgerButton 
          isOpen={isMobileMenuOpen} 
          onClick={toggleMobileMenu} 
        />
      </div>
      
      <MobileMenu
        isOpen={isMobileMenuOpen}
        navLinks={navLinks}
        isAuthenticated={isAuthenticated}
        onCloseMobileMenu={closeMobileMenu}
        onLogout={logout}
      />
    </header>
  );
};

export default Navbar;
