// /src/components/Button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 1. Definisikan semua varian dan gaya tombol menggunakan cva
const buttonVariants = cva(
  // Gaya dasar yang berlaku untuk semua varian
  "inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // Varian berdasarkan peran/tampilan
      variant: {
        primary: "bg-accent-primary text-background-dark hover:bg-accent-primary/90",
        secondary: "bg-background-subtle border border-border-subtle hover:bg-border-subtle",
        tertiary: "hover:text-text-heading", // Link teks sederhana
      },
      // Varian berdasarkan ukuran
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
      },
    },
    // Varian default yang akan digunakan jika tidak ada props yang diberikan
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

// 2. Definisikan props untuk komponen, termasuk varian dari cva
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 3. Buat komponen React-nya
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };