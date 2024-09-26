import { HeatloadFactors } from "./heatload"

export type CalculatedResults = {
  name: string
  area: number
} & HeatloadFactors
