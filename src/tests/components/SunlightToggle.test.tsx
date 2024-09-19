import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
// import userEvent from "@testing-library/user-event"
import { SunlightToggle } from "@/components/custom/SunlightToggle"
import userEvent from "@testing-library/user-event"

test("should check UnitTypeSelect functionality", async () => {
  render(<SunlightToggle />)

  const sunlightToggle = screen.getByTestId("sunlight-toggle-cmp")
  await userEvent.click(sunlightToggle)
  expect(screen.getByText("No")).toBeDefined()

  await userEvent.click(sunlightToggle)
  expect(screen.getByText("Yes")).toBeDefined()
})
