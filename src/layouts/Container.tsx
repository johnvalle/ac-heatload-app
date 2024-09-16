import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren & {
  className?: string
}

export const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("max-w-[1000px] mx-auto bg-white px-8", className)}>
      {children}
    </div>
  )
}
