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
        transition-colors
        ${className}
      `}
            style={{
                ['--hover-bg' as string]: 'var(--color-accent)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background)'}
            onMouseDown={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;