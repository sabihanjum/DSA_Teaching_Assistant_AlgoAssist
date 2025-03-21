
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NavbarThemeToggle } from '../NavbarThemeToggle';
import NavbarLink from './NavbarLink';
import { NavLinkType } from './types';

interface DesktopNavMenuProps {
  navLinks: NavLinkType[];
  isAuthenticated: boolean;
  onLogout: () => void;
}

const DesktopNavMenu: React.FC<DesktopNavMenuProps> = ({
  navLinks,
  isAuthenticated,
  onLogout
}) => {
  return (
    <div className="hidden md:flex items-center space-x-1">
      <nav className="mr-4">
        <ul className="flex space-x-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavbarLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="flex items-center space-x-2">
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={onLogout}>
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
  );
};

export default DesktopNavMenu;
