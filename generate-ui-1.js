import fs from 'fs';
import path from 'path';

const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');
if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });

// 1. Button Library (Updated)
const buttonCode = `import React from 'react';
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
    
    const baseStyles = "inline-flex items-center justify-center font-body font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
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

    const combinedClassName = \`\${baseStyles} \${variants[variant]} \${sizes[size]} \${className}\`;

    return (
      <motion.button
        ref={ref}
        whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
`;

// 2. Badge
const badgeCode = `import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({ children, variant = 'default', className = '', icon }: BadgeProps) {
  const base = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-body whitespace-nowrap transition-colors";
  const variants = {
    default: "bg-brand-neutral-beige text-brand-primary",
    success: "bg-success-50 text-success-900 border border-success-500/20",
    warning: "bg-warning-50 text-warning-900 border border-warning-500/20",
    error: "bg-error-50 text-error-900 border border-error-500/20",
    outline: "bg-transparent text-brand-neutral-charcoal/70 border border-brand-neutral-grey",
  };

  return (
    <span className={\`\${base} \${variants[variant]} \${className}\`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
`;

// 3. Alerts
const alertCode = `import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

type AlertVariant = 'success' | 'warning' | 'info' | 'error';

interface AlertProps {
  title: string;
  description?: string;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}

export function Alert({ title, description, variant = 'info', onClose, className = '' }: AlertProps) {
  const variants = {
    success: { bg: 'bg-success-50', border: 'border-success-500/20', text: 'text-success-900', icon: <CheckCircle2 className="text-success-500" /> },
    warning: { bg: 'bg-warning-50', border: 'border-warning-500/20', text: 'text-warning-900', icon: <AlertTriangle className="text-warning-500" /> },
    error: { bg: 'bg-error-50', border: 'border-error-500/20', text: 'text-error-900', icon: <XCircle className="text-error-500" /> },
    info: { bg: 'bg-brand-neutral-beige', border: 'border-brand-primary/20', text: 'text-brand-primary', icon: <Info className="text-brand-primary" /> },
  };

  const v = variants[variant];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={\`flex p-4 rounded-xl border \${v.bg} \${v.border} \${v.text} \${className}\`}
      >
        <div className="shrink-0 mr-3">{v.icon}</div>
        <div className="flex-grow">
          <h4 className="font-heading text-sm font-bold">{title}</h4>
          {description && <p className="font-body text-sm mt-1 opacity-80">{description}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className="shrink-0 ml-4 hover:opacity-70 transition-opacity">
            <X size={16} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
`;

// 4. Loading States
const loadingCode = `import React from 'react';
import { motion } from 'motion/react';

export function Spinner({ size = 'md', className = '' }: { size?: 'sm'|'md'|'lg', className?: string }) {
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-3', lg: 'w-12 h-12 border-4' };
  return (
    <div className={\`animate-spin rounded-full border-brand-primary border-t-transparent \${sizes[size]} \${className}\`} />
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={\`animate-pulse bg-brand-neutral-grey rounded-lg \${className}\`} />
  );
}
`;

// 5. Empty States
const emptyStateCode = `import React from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = <FileQuestion size={48} />, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center bg-brand-neutral-white rounded-3xl border border-brand-neutral-grey border-dashed"
    >
      <div className="text-brand-neutral-charcoal/20 mb-6">{icon}</div>
      <h3 className="font-heading text-2xl text-brand-neutral-charcoal mb-2">{title}</h3>
      <p className="font-body text-brand-neutral-charcoal/60 max-w-md mb-8">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">{actionLabel}</Button>
      )}
    </motion.div>
  );
}
`;

fs.writeFileSync(path.join(uiDir, 'Button.tsx'), buttonCode);
fs.writeFileSync(path.join(uiDir, 'Badge.tsx'), badgeCode);
fs.writeFileSync(path.join(uiDir, 'Alert.tsx'), alertCode);
fs.writeFileSync(path.join(uiDir, 'Loading.tsx'), loadingCode);
fs.writeFileSync(path.join(uiDir, 'EmptyState.tsx'), emptyStateCode);

console.log('Group 1 generated!');
