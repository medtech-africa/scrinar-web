import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-grey-800 text-grey-50",
				primary: "bg-primary text-grey-50",
				secondary: "bg-secondary text-grey-900",
				ghost: "bg-lust-50 text-lust-200 ",
				border: "border-2 border-lust-200 bg-primary text-primary-foreground",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "rounded-lg px-4 py-[7px]",
				md: "rounded-lg px-4 py-2",
				lg: "rounded-lg px-4 py-3",
				xl: "rounded-lg px-4 py-4",
				// icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
