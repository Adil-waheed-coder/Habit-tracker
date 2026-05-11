import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-sm border-2 border-slate-900 bg-white px-3 py-2 text-sm transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-100 dark:shadow-[2px_2px_0px_0px_rgba(241,245,249,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(241,245,249,1)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-violet-500 focus-visible:-translate-y-0.5 focus-visible:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:focus-visible:shadow-[4px_4px_0px_0px_rgba(241,245,249,1)] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }