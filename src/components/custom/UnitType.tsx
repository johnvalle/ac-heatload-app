import residentialSvg from "@assets/home.svg"
import commercialSvg from "@assets/company.svg"
import { useState } from "react"
import { cn } from "@/lib/utils"

type UnitType = "residential" | "commercial"
type Props = {
  defaultValue?: UnitType
}
export const UnitTypeSelect = ({ defaultValue = "residential" }: Props) => {
  const unitTypes = [
    {
      image: {
        src: residentialSvg,
        alt: "home icon",
      },
      value: "residential",
      color: {
        bg: "bg-custom-purple-light",
        text: "text-custom-purple-dark",
      },
    },
    {
      image: {
        src: commercialSvg,
        alt: "building icon",
      },
      value: "commercial",
      color: {
        bg: "bg-custom-blue-light",
        text: "textcustom-blue-dark",
      },
    },
  ]

  const [selected, setSelected] = useState(defaultValue)

  return unitTypes.map(({ image, value, color }) => (
    <div
      className={cn(
        "flex items-center justify-between cursor-pointer h-[80px] w-[285px] rounded-lg p-4 relative hover:font-bold group/unitType-card hover:transition-all ease-in-out ",
        value === selected ? color.bg : "bg-custom-gray-bg"
      )}
      onClick={() => setSelected(value as UnitType)}
    >
      <p
        className={cn(
          value === selected ? color.text : "text-custom-black",
          value === selected && "font-bold"
        )}
      >
        {value}
      </p>
      <img
        className="absolute right-4 -top-4 bg-custom-gray text-custom-black group-hover/unitType-card:transition-all group-hover/unitType-card:ease-in-out group-hover/unitType-card:-translate-y-2"
        src={image.src}
        alt={image.alt}
      />
    </div>
  ))
}
