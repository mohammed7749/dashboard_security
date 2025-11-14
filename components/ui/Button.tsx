
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default: 'bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground hover:bg-primary/90 dark:hover:bg-dark-primary/90',
    destructive: 'bg-destructive dark:bg-dark-destructive text-destructive-foreground dark:text-dark-destructive-foreground hover:bg-destructive/90 dark:hover:bg-dark-destructive/90',
    outline: 'border border-input dark:border-dark-input bg-background dark:bg-dark-background hover:bg-accent dark:hover:bg-dark-accent hover:text-accent-foreground dark:hover:text-dark-accent-foreground',
    secondary: 'bg-secondary dark:bg-dark-secondary text-secondary-foreground dark:text-dark-secondary-foreground hover:bg-secondary/80 dark:hover:bg-dark-secondary/80',
    ghost: 'hover:bg-accent dark:hover:bg-dark-accent hover:text-accent-foreground dark:hover:text-dark-accent-foreground',
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};
