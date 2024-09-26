import { useState } from "react"

import { CalculatedResults } from "@/types/calculation"
import { SavedResult } from "@/types/generics"

type ResultType = "calculations" | "validations"
type StoredData = Record<ResultType, SavedResult<CalculatedResults>[]>

const getCalculations = () => {
  const storedCalculations: SavedResult<CalculatedResults>[] =
    JSON.parse(localStorage.getItem("savedCalculations") as string) ?? []
  return storedCalculations
}

const getValidations = () => {
  const storedValidations: SavedResult<CalculatedResults>[] =
    JSON.parse(localStorage.getItem("savedValidations") as string) ?? []
  return storedValidations
}

export const useStorage = () => {
  const [storedData, setStoredData] = useState<StoredData>({
    calculations: getCalculations(),
    validations: getValidations(),
  })

  const saveResult = (
    type: ResultType,
    data: SavedResult<CalculatedResults>
  ) => {
    const storageKey =
      type === "calculations" ? "savedCalculations" : "savedValidations"

    const updatedData: SavedResult<CalculatedResults>[] = [
      ...storedData[type],
      data,
    ]

    setStoredData({ ...storedData, [type]: updatedData })
    localStorage.setItem(storageKey, JSON.stringify(updatedData))
  }

  const removeResult = (type: ResultType, calculationDate: number) => {
    const storageKey =
      type === "calculations" ? "savedCalculations" : "savedValidations"

    const filteredData = storedData[type].filter(
      ({ date }) => date !== calculationDate
    )

    setStoredData({ ...storedData, [type]: filteredData })
    localStorage.setItem(storageKey, JSON.stringify(filteredData))
  }

  return {
    storedData,
    saveResult,
    removeResult,
  }
}
