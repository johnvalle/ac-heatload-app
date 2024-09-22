import { ItemsHeatLoadMap } from "@/constants/HeatItems"
import { HeatLoad } from "@/constants/HeatLoad"
import { HeatItems, UnitType } from "@/types/heatload"

export const getBulbHeatload = (bulbCount: number): number => {
  return bulbCount * HeatLoad.bulb
}

export const getUnitTypeHeatLoad = (unitType: UnitType): number => {
  return HeatLoad[unitType]
}

export const getAreaHeatLoad = (area: number, unitType: UnitType): number => {
  return area * getUnitTypeHeatLoad(unitType)
}

export const getPeopleHeatLoad = (personCount: number): number => {
  return personCount * HeatLoad.person
}

export const getWindowHeatLoad = (
  windowCount: number,
  isHitByDirectSunlight: boolean
): number => {
  return (
    windowCount * HeatLoad.windows +
    Number(isHitByDirectSunlight && HeatLoad.sunlight)
  )
}

export const getHeatItemsHeatload = (heatItems: HeatItems) =>
  heatItems.reduce((total, key) => (total += ItemsHeatLoadMap[key]), 0)
