import { cn } from "@/lib/utils"
import { useState } from "react"

type HeatComponent = "LED TV" | "Working Kitchen" | "Refrigerator" | "Computer"
const heatComponents = ["LED TV", "Working Kitchen", "Refrigerator", "Computer"]

type Props = {
  defaultValue?: HeatComponent[]
}

export const HeatComponentsSelector = (props: Props) => {
  const [selectedComponents, setSelectedComponents] = useState<
    typeof heatComponents
  >(props.defaultValue ?? [])

  const colorList = [
    "font-custom-green-dark bg-custom-green-light",
    "font-custom-blue-dark bg-custom-blue-light",
    "font-custom-purple-dark bg-custom-purple-light",
    "font-custom-black bg-custom-yellow-light",
  ]

  const isSelected = (name: string) => selectedComponents.includes(name)

  const toggleComponent = (name: string) => {
    if (isSelected(name)) {
      return setSelectedComponents((prevState) =>
        prevState.filter((item) => item !== name)
      )
    }
    return setSelectedComponents((prevState) => [...prevState, name])
  }

  return heatComponents.map((item, idx) => (
    <div
      id={`${item}-${idx}`}
      onClick={() => toggleComponent(item)}
      className={cn(
        "p-4 rounded-lg cursor-pointer ease-in-out",
        isSelected(item)
          ? `font-bold ${colorList[idx]}`
          : `bg-custom-gray-bg font-custom-black`
      )}
    >
      <p>{item}</p>
    </div>
  ))
}
