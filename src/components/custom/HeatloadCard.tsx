import { cn } from "@/lib/utils"

type Props = {
  isSuccess?: boolean
  hpLevel?: string
  dir?: "row" | "col"
}

export const HeatloadCard = ({ hpLevel, dir, isSuccess }: Props) => {
  return (
    <div
      className={cn(
        "w-full flex gap-4 justify-center items-center ",
        dir === "col" && "flex-col"
      )}
    >
      <div
        className={cn(
          "w-[72px] h-[72px] text-[32px] p-4 rounded-full flex items-center justify-center",
          isSuccess ? "bg-custom-green-light" : "bg-custom-yellow-light"
        )}
      >
        <p className="text-custom-black font-bold">{hpLevel}</p>
      </div>
      <div
        className={cn(
          "flex flex-col",
          dir === "col" ? "text-center" : "text-left"
        )}
      >
        <p className="font-bold">Horsepower</p>
        <p>Air-conditioner</p>
      </div>
    </div>
  )
}
