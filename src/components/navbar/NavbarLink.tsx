
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavbarLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ 
  href, 
  label, 
  onClick,
  className 
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
        isActive
          ? 'bg-secondary text-foreground'
          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
        className
      )}
    >
      {label}
    </Link>
  );
};

export default NavbarLink;
