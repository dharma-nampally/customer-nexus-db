import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

const LoadingButton = ({ 
  loading = false, 
  loadingText = 'Loading...', 
  children, 
  disabled, 
  className,
  ...props 
}: LoadingButtonProps) => {
  return (
    <Button 
      disabled={disabled || loading} 
      className={cn(
        loading && 'cursor-not-allowed opacity-80',
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;