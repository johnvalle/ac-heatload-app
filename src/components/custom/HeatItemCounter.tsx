import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
  defaultValue?: number
  icon: string
  name: string
  max: number
  min: number
  alt: string
  onChange?: (value: number) => void
}
export const HeatItemCounter = ({
  min,
  max,
  name,
  icon,
  alt,
  onChange,
  defaultValue = 0,
}: Props) => {
  const [counter, setCounter] = useState(defaultValue)
  const [showAnimation, setShowAnimation] = useState(true)
  const isMin = counter === min
  const isMax = counter === max

  const buttonStyle = cn(
    "absolute top-[calc(50%_-_18px)] bg-white flex items-center justify-center w-9 h-9 rounded-full shadow-lg transition-all ease-in-out"
  )

  useEffect(() => {
    if (defaultValue > max || defaultValue < min) {
      throw new Error(
        "Default value must not be greater than max or less than min"
      )
    }
  }, [defaultValue, min, max])

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false)
    }, 500)
  }, [showAnimation])

  useEffect(() => {
    setShowAnimation(true)
    if (onChange) {
      onChange(counter)
    }
  }, [counter])

  return (
    <div className="relative bg-custom-gray-bg w-[240px] border border-custom-gray-stroke rounded-lg">
      <div
        className={cn(
          "z-10 absolute font-bold text-custom-blue-dark bg-custom-blue-light -top-4 -right-4 h-9 w-9 rounded-full flex items-center justify-center",
          showAnimation ? "animate-in" : "animate-out"
        )}
      >
        {counter}
      </div>
      <div className="h-[90px] bg-white flex items-center justify-center relative">
        <img src={icon} alt={alt} className="absolute top-6" />
      </div>
      <div className="h-[90px] flex flex-col justify-center items-center">
        <p className="pt-4">{name}</p>
        <button
          type="button"
          className={cn(
            "-left-4",
            buttonStyle,
            !isMin ? "hover:scale-[120%] cursor-pointer" : "scale-0"
          )}
          disabled={counter === min}
          aria-label="decrease"
          aria-hidden={isMin}
          onClick={() => setCounter((prevState) => (prevState -= 1))}
        >
          <Minus className="stroke-custom-black" />
        </button>
        <button
          type="button"
          className={cn(
            "-right-4",
            buttonStyle,
            !isMax ? "hover:scale-[120%] cursor-pointer" : "scale-0"
          )}
          disabled={counter === max}
          aria-label="increase"
          aria-hidden={isMax}
          onClick={() => setCounter((prevState) => (prevState += 1))}
        >
          <Plus className="stroke-custom-black" />
        </button>
      </div>
    </div>
  )
}
