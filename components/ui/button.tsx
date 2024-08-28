import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "[&>.btn-bg]:bg-white/0 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 *:pointer-events-none [text-shadow:_0_0_2px_rgba(0,0,0,0.5)]",
  {
    variants: {
      variant: {
        default:
          "[&>.btn-bg]:bg-white/10 [&>.btn-bg]:hover:bg-white/20 text-foreground",
        destructive: "[&>.btn-bg]:bg-destructive text-destructive-foreground",
        outline:
          "border border-input [&>.btn-bg]:bg-white/10 hover:text-accent-foreground",
        secondary: "[&>.btn-bg]:bg-secondary/20 text-secondary-foreground",
        ghost: "[&>.btn-bg]:hover:bg-white/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-11 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    // get rounded-* classes
    const roundedClasses = className?.match(/rounded-\S+/g);
    return (
      <div
        className={cn(
          "flex min-h-[60px] min-w-[60px] items-center justify-center",
          roundedClasses,
        )}
      >
        <Comp
          className={cn(
            "relative",
            buttonVariants({ variant, size, className }),
          )}
          ref={ref}
          {...props}
        >
          {children}
          <div
            className={cn(
              "btn-bg absolute inset-0 rounded-md transition-colors",
              roundedClasses,
            )}
          />
        </Comp>
      </div>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
