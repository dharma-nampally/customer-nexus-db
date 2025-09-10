import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gradient-primary text-primary-foreground shadow-elegant hover:shadow-hover hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-card hover:bg-destructive/90 hover:shadow-hover",
        outline:
          "border border-input bg-background/80 backdrop-blur-sm shadow-card hover:bg-accent hover:text-accent-foreground hover:shadow-hover hover:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-card hover:bg-secondary/80 hover:shadow-hover",
        ghost: "hover:bg-accent/80 hover:text-accent-foreground transition-colors",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground shadow-card hover:bg-success/90 hover:shadow-hover",
        premium: "gradient-primary text-white shadow-elegant border border-white/20 hover:shadow-hover hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
