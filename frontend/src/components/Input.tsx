"use client";

import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Heroicons v2 (outline) - eye
const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322c1.732-4.02 5.77-6.822 9.964-6.822 4.193 0 8.232 2.802 9.964 6.822-1.732 4.02-5.77 6.822-9.964 6.822-4.193 0-8.232-2.802-9.964-6.822z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Heroicons v2 (outline) - eye slash
const EyeSlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.478 10.478 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.228 6.228L3 3m3.228 3.228l12.544 12.544M15.136 15.136a3 3 0 01-4.272-4.272" />
  </svg>
);

const Input: React.FC<InputProps> = ({ className, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  if (!isPassword) {
    return (
      <input
        type={type}
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
  }

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
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
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[--color-link] hover:text-[--color-foreground]"
      >
        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default Input;
