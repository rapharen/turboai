import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`
        bg-transparent
        border border-[--color-accent]
        text-[--color-foreground]
        placeholder:text-[--color-link]
        text-sm
        rounded-lg
        focus:ring-[--color-accent] focus:border-[--color-accent]
        block w-full p-2.5
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;
