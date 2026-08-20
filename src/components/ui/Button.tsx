import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'text' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'fab';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    // Magnetic Effect Logic
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || disabled || isLoading) return;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.2; // 0.2 is the magnetic pull strength
      const y = (e.clientY - top - height / 2) * 0.2;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-body font-bold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed z-10";
    
    const variants = {
      primary: "bg-brand-primary text-brand-neutral-white hover:bg-brand-primary/90 focus:ring-brand-primary shadow-level-2 hover:shadow-level-3",
      secondary: "bg-brand-secondary text-brand-neutral-white hover:bg-brand-secondary/90 focus:ring-brand-secondary shadow-level-2 hover:shadow-level-3",
      outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-neutral-white focus:ring-brand-primary",
      ghost: "bg-transparent text-brand-primary hover:bg-brand-neutral-beige focus:ring-brand-neutral-beige",
      text: "bg-transparent text-brand-primary hover:text-brand-primary/80 focus:ring-transparent px-0",
      danger: "bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 shadow-sm",
      success: "bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 shadow-sm",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
      icon: "p-3",
      fab: "p-4 text-xl shadow-floating hover:shadow-modal",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <motion.button
        ref={(node) => {
          // Merge refs
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        data-cursor="pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        whileTap={disabled || isLoading ? {} : { scale: 0.95 }}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </span>
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
