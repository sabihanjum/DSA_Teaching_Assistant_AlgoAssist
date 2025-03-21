
import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="md:hidden flex items-center p-2 rounded-md"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      <span className="sr-only">Menu</span>
      <div className="relative w-6 h-5">
        <span
          className={`absolute block h-0.5 w-6 bg-foreground rounded-sm transform transition duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
          }`}
        />
        <span
          className={`absolute block h-0.5 w-6 bg-foreground rounded-sm transform transition duration-300 ease-in-out ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ top: '10px' }}
        />
        <span
          className={`absolute block h-0.5 w-6 bg-foreground rounded-sm transform transition duration-300 ease-in-out ${
            isOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-5'
          }`}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;
