import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type Props = {
  defaultValue?: boolean
  onChange?: (value: boolean) => void
}
export const SunlightToggle = ({ onChange, defaultValue = true }: Props) => {
  const [isSelected, setIsSelected] = useState(defaultValue)

  useEffect(() => {
    if (onChange) {
      onChange(isSelected)
    }
  }, [isSelected])

  return (
    <div
      data-testid="sunlight-toggle-cmp"
      className="w-[285px] h-[50px] flex bg-custom-gray-bg rounded-lg relative cursor-pointer"
      onClick={() => setIsSelected((prevState) => !prevState)}
    >
      <div
        className={cn(
          "absolute w-1/2 h-full flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out shadow-sm font-bold",
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
