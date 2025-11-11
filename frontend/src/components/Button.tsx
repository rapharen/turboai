import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        bg-[--color-accent] 
        text-[--color-foreground] 
        font-semibold 
        py-2 px-8 
        rounded-full 
        border border-gray-400/50 
        hover:bg-opacity-90 
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
