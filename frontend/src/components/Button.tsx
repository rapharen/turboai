import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({children, className, ...props}) => {
    return (
        <button
            className={`
        bg-[--color-background]
        text-[--color-foreground] 
        font-medium
        text-sm
        py-2 px-6
        rounded-full 
        border border-[--color-accent]
        hover:bg-[var(--accent-20)]
        active:bg-[var(--accent-30)]
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