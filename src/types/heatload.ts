import { ItemsHeatLoadMap } from "@/constants/HeatItems"

export type HeatItemsType = typeof ItemsHeatLoadMap
export type HeatItems = (keyof HeatItemsType)[]

export type UnitType = "residential" | "commercial"

export type HeatloadFactors = {
  hasDirectSunlight: boolean
  unitType: UnitType
  heatItems: HeatItems
  personCount: number
  bulbCount: number
  windowCount: number
}
