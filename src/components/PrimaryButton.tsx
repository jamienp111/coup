import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function PrimaryButton({ children, className = "", ...props }: Props) {
  return (
    <button
      className={`bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
