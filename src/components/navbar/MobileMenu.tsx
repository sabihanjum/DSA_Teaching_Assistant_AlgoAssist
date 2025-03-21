
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavbarThemeToggle } from '../NavbarThemeToggle';
import NavbarLink from './NavbarLink';
import { NavLinkType } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLinkType[];
  isAuthenticated: boolean;
  onCloseMobileMenu: () => void;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navLinks,
  isAuthenticated,
  onCloseMobileMenu,
  onLogout
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out transform md:hidden',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex flex-col h-full pt-16 px-4">
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <NavbarLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={onCloseMobileMenu}
              className="px-4 py-3 text-lg"
            />
          ))}
        </nav>
        
        <div className="mt-8 flex flex-col space-y-2">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="w-full"
                onClick={onCloseMobileMenu}
              >
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  onLogout();
                  onCloseMobileMenu();
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
                onClick={onCloseMobileMenu}
              >
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link 
                to="/signup" 
                className="w-full"
                onClick={onCloseMobileMenu}
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
  );
};

export default MobileMenu;
