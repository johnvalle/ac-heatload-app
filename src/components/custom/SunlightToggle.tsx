import { cn } from "@/lib/utils"
import { useState } from "react"

type Props = {
  defaultValue?: boolean
}
export const SunlightToggle = ({ defaultValue = true }: Props) => {
  const [isSelected, setIsSelected] = useState(defaultValue)
  return (
    <div
      className="w-[285px] h-[50px] flex bg-custom-gray-bg rounded-lg relative cursor-pointer"
      onClick={() => setIsSelected((prevState) => !prevState)}
    >
      <div
        className={cn(
          "absolute w-1/2 h-full flex items-center justify-center rounded-lg transition-all ease-in-out shadow-sm font-bold",
          !isSelected
            ? "translate-x-[100%] border bg-white"
            : "bg-custom-yellow-light"
        )}
      >
        <p>{isSelected ? "Yes" : "No"}</p>
      </div>
    </div>
  )
}
