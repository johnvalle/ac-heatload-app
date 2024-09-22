import { useCallback, useReducer, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Range } from "@/constants/HorsepowerRange"
import { calculatorReducer } from "@/reducers/calculatorReducer"
import { HeatloadFactors } from "@/types/heatload"
import {
  getAreaHeatLoad,
  getBulbHeatload,
  getHeatItemsHeatload,
  getPeopleHeatLoad,
  getWindowHeatLoad,
} from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Room name must be at least 2 characters.",
  }),
  area: z
    .number()
    .min(0.1, { message: "Room area must be greater than zero." })
    .max(999, {
      message: "This room area size is currently not supported.",
    }),
})

export const useHeatloadCalculator = () => {
  const initialData = {
    bulbCount: 0,
    personCount: 0,
    windowCount: 0,
    unitType: "residential",
    hasDirectSunlight: false,
    heatItems: [],
  } satisfies HeatloadFactors

  const [state, dispatch] = useReducer(calculatorReducer, initialData)
  const [computedHeatload, setComputedHeatload] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      area: undefined,
    },
  })

  /** Compute heatload on submit */
  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      const heatItems = getHeatItemsHeatload(state.heatItems)
      const bulbs = getBulbHeatload(state.bulbCount)
      const windows = getWindowHeatLoad(
        state.bulbCount,
        state.hasDirectSunlight
      )
      const person = getPeopleHeatLoad(state.personCount)
      const area = getAreaHeatLoad(values.area, state.unitType)

      const sum = [heatItems, bulbs, windows, person, area].reduce(
        (partialSum, value) => (partialSum += value),
        0
      )

      setComputedHeatload(sum)
    },
    [state]
  )

  /**
   * Based on range of values,
   * check if heatload is within range.
   * If not, increase hp by 0.5.
   */
  const computedHorsePower = Range.reduce((hp, curr) => {
    if (computedHeatload > curr) {
      return hp + 0.5
    } else {
      return hp
    }
  }, 1)

  return {
    data: {
      ...state,
      ...form.getValues(),
    },
    form,
    dispatch,
    onSubmit,
    computedHeatload,
    computedHorsePower,
  }
}
