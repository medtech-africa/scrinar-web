import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      "display/2xl": "text-7xl",
      "display/xl": "text-6xl",
      "display/lg": "text-5xl",
      "display/md": "text-4xl",
      "display/sm": "text-3xl",
      "display/xs": "text-2xl",
      "text/xl": "text-xl",
      "text/lg": "text-lg",
      "text/md": "text-base",
      "text/sm": "text-sm",
      "text/xs": "text-xs",
    },
    weight: {
      default: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      "x-bold": "font-bold",
    },
  },
  defaultVariants: {
    variant: "text/md",
    weight: "default",
  },
});

export interface TextProps
  extends React.ComponentPropsWithRef<"div">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

const Text = React.forwardRef<any, TextProps>(
  ({ className, variant, weight, as: Comp = "span", ...props }, ref) => {
    return (
      <Comp
        className={cn(textVariants({ variant, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
