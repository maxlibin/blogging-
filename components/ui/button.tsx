import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-900 text-slate-50 hover:bg-slate-800 shadow-md shadow-slate-900/20",
      destructive: "bg-red-500 text-slate-50 hover:bg-red-600 shadow-md shadow-red-500/20",
      outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 hover:text-slate-900 text-slate-700",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-500",
      link: "text-slate-900 underline-offset-4 hover:underline",
    }
    
    const sizes = {
      default: "h-11 px-6 py-2.5",
      sm: "h-9 rounded-md px-4 text-xs",
      lg: "h-14 rounded-md px-8 text-lg",
      icon: "h-10 w-10 rounded-md",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }