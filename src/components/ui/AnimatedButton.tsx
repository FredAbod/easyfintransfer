
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  className?: string;
}

const AnimatedButton = ({
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  className,
  ...props
}: AnimatedButtonProps) => {
  // Map our custom variants to shadcn Button variants
  const getVariant = () => {
    if (variant === 'primary') return 'default';
    return variant;
  };

  return (
    <Button
      variant={getVariant()}
      size={size}
      className={cn(
        'relative overflow-hidden button-hover transition-all duration-300',
        variant === 'primary' && 'bg-fintech-blue text-white hover:bg-fintech-blue/90',
        isLoading && 'opacity-80 pointer-events-none',
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      <span className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>{children}</span>
    </Button>
  );
};

export default AnimatedButton;
