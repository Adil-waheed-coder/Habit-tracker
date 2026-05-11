import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950",
          {
            "bg-violet-500 text-white hover:bg-violet-600 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-100 dark:shadow-[4px_4px_0px_0px_rgba(241,245,249,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(241,245,249,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] dark:active:shadow-[0px_0px_0px_0px_rgba(241,245,249,1)]": variant === "default",
            "border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-900 dark:border-slate-100 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:shadow-[4px_4px_0px_0px_rgba(241,245,249,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(241,245,249,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] dark:active:shadow-[0px_0px_0px_0px_rgba(241,245,249,1)]": variant === "outline",
            "hover:bg-slate-100/50 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-50 border-2 border-transparent hover:border-slate-800 dark:hover:border-slate-200": variant === "ghost",
            "text-violet-600 underline-offset-4 hover:underline dark:text-violet-400": variant === "link",
            "bg-rose-500 text-white hover:bg-rose-600 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-100 dark:shadow-[4px_4px_0px_0px_rgba(241,245,249,1)] hover:-translate-y-0.5 align-middle": variant === "danger",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-sm px-3": size === "sm",
            "h-11 rounded-sm px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
