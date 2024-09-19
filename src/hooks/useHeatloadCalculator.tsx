import { useCallback, useReducer, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ItemsHeatLoadMap } from "@/constants/HeatItems"
import { calculatorReducer } from "@/reducers/calculatorReducer"
import { HeatItems, HeatloadFactors } from "@/types/heatload"
import { zodResolver } from "@hookform/resolvers/zod"
import { Range } from "@/constants/HorsepowerRange"

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

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      const heatItems = getHeatItemsHeatload(state.heatItems)
      const bulbs = state.bulbCount * 36
      const windows = state.windowCount * 600
      const sunlight = state.hasDirectSunlight ? 50 : 0
      const person = state.personCount * 600
      const area = values.area * (state.unitType === "residential" ? 600 : 800)
      form.reset({}, { keepValues: true })
      const total = heatItems + bulbs + windows + sunlight + person + area

      setComputedHeatload(total)
    },
    [state]
  )

  const computedHorsePower = Range.reduce((hp, curr) => {
    if (computedHeatload > curr) {
      return hp + 0.5
    } else {
      return hp
    }
  }, 1)

  const getHeatItemsHeatload = (heatItems: HeatItems) =>
    heatItems.reduce((total, key) => (total += ItemsHeatLoadMap[key]), 0)

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
