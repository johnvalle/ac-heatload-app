import * as React from "react"

import { cn } from "@/lib/utils"
import * as SliderPrimitive from "@radix-ui/react-slider"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="flex items-center">
    <div className="w-10 h-10 font-bold flex items-center justify-center bg-custom-gray-bg rounded-full mx-2">
      {props.min}
    </div>
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-custom-gray-bg">
        <SliderPrimitive.Range className="absolute h-full bg-custom-black" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="relative block h-5 w-5 rounded-full border-2 border-custom-black bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"></SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
    <div className="w-10 h-10 font-bold flex items-center justify-center bg-custom-gray-bg rounded-full mx-2">
      {props.max}
    </div>
  </div>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
