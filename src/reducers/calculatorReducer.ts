import { HeatloadFactors } from "@/types/heatload"
import { KeyFromReducerType } from "@/types/generics"

type ReducerType = `Set${Capitalize<keyof HeatloadFactors>}`

type ReducerAction = {
  [Key in ReducerType]: {
    type: Key
    payload: HeatloadFactors[KeyFromReducerType<Key>]
  }
}[ReducerType]

export const calculatorReducer = (
  state: HeatloadFactors,
  action: ReducerAction
): HeatloadFactors => {
  switch (action.type) {
    case "SetBulbCount": {
      return {
        ...state,
        bulbCount: action.payload,
      }
    }

    case "SetPersonCount": {
      return {
        ...state,
        personCount: action.payload,
      }
    }
    case "SetWindowCount": {
      return {
        ...state,
        windowCount: action.payload,
      }
    }

    case "SetHasDirectSunlight": {
      return {
        ...state,
        hasDirectSunlight: action.payload,
      }
    }

    case "SetHeatItems": {
      return {
        ...state,
        heatItems: action.payload,
      }
    }

    case "SetUnitType": {
      return {
        ...state,
        unitType: action.payload,
      }
    }

    default:
      return state
  }
}
