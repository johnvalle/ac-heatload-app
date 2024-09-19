import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import userEvent from "@testing-library/user-event"

import { UnitTypeSelect } from "@/components/custom/UnitType.tsx"

test("should check UnitTypeSelect functionality", async () => {
  render(<UnitTypeSelect onChange={(value) => console.log(value)} />)

  const commercialButton = screen.getByText("commercial")
  const residentialButton = screen.getByText("residential")

  await userEvent.click(commercialButton)

  expect(Array.from(residentialButton.classList)).toContain("text-custom-black")
  expect(Array.from(commercialButton.classList)).not.toContain(
    "text-custom-black"
  )

  await userEvent.click(residentialButton)

  expect(Array.from(commercialButton.classList)).toContain("text-custom-black")
  expect(Array.from(residentialButton.classList)).not.toContain(
    "text-custom-black"
  )
})
