
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { NavbarThemeToggle } from './NavbarThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
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
  
  const navLinks = [
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
        
        <div className="hidden md:flex items-center space-x-1">
          <nav className="mr-4">
            <ul className="flex space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                        isActive
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Sign Out
                </Button>
                <NavbarThemeToggle />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
                <NavbarThemeToggle />
              </div>
            )}
          </div>
        </div>
        
        <button
          className="md:hidden flex items-center p-2 rounded-md"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          <div className="relative w-6 h-5">
            <span
              className={`absolute block h-0.5 w-6 bg-foreground rounded-sm transform transition duration-300 ease-in-out ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
              }`}
            />
            <span
              className={`absolute block h-0.5 w-6 bg-foreground rounded-sm transform transition duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ top: '10px' }}
            />
            <span
              className={`absolute block h-0.5 w-6 bg-foreground rounded-sm transform transition duration-300 ease-in-out ${
                isMobileMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-5'
              }`}
            />
          </div>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out transform md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full pt-16 px-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-3 rounded-md text-foreground text-lg font-medium hover:bg-secondary/80 transition-colors"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="w-full"
                  onClick={closeMobileMenu}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                >
                  Sign Out
                </Button>
                <div className="flex justify-start w-full py-2">
                  <NavbarThemeToggle />
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="w-full"
                  onClick={closeMobileMenu}
                >
                  <Button variant="ghost" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full"
                  onClick={closeMobileMenu}
                >
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
                <div className="flex justify-start w-full py-2">
                  <NavbarThemeToggle />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
