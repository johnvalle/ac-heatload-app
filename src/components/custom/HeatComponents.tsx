import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type HeatComponent = "LED TV" | "Working Kitchen" | "Refrigerator" | "Computer"
const heatComponents: HeatComponent[] = [
  "LED TV",
  "Working Kitchen",
  "Refrigerator",
  "Computer",
]

type Props = {
  defaultValue?: HeatComponent[]
  onChange?: (value: HeatComponent[]) => void
}

export const HeatComponentsSelector = ({ onChange, defaultValue }: Props) => {
  const [selectedComponents, setSelectedComponents] = useState<HeatComponent[]>(
    defaultValue ?? []
  )

  const colorList = [
    "font-custom-green-dark bg-custom-green-light",
    "font-custom-blue-dark bg-custom-blue-light",
    "font-custom-purple-dark bg-custom-purple-light",
    "font-custom-black bg-custom-yellow-light",
  ]

  const isSelected = (name: HeatComponent) => selectedComponents.includes(name)

  const toggleComponent = (name: HeatComponent) => {
    if (isSelected(name)) {
      return setSelectedComponents((prevState) =>
        prevState.filter((item) => item !== name)
      )
    }
    return setSelectedComponents((prevState) => [...prevState, name])
  }

  useEffect(() => {
    if (onChange) {
      onChange(selectedComponents)
    }
  }, [selectedComponents])

  return heatComponents.map((item, idx) => (
    <button
      key={`${item}-${idx}`}
      type="button"
      onClick={() => toggleComponent(item)}
      aria-pressed={isSelected(item)}
      className={cn(
        "p-4 rounded-lg cursor-pointer ease-in-out",
        isSelected(item)
          ? `font-bold ${colorList[idx]}`
          : `bg-custom-gray-bg font-custom-black`
      )}
    >
      <p>{item}</p>
    </button>
  ))
}
