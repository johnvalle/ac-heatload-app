import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import userEvent from "@testing-library/user-event"
import { HeatComponentsSelector } from "@/components/custom/HeatComponents"

describe("Heat component selector component", () => {
  test("should check that no heat item is selected on render", async () => {
    render(<HeatComponentsSelector />)
    const heatItems = screen.queryAllByRole("button", { pressed: true })
    expect(heatItems.length).toBe(0)
  })

  test("should select some heat items after click", async () => {
    render(<HeatComponentsSelector defaultValue={[]} />)

    const tvButton = screen.getByText("LED TV")
    const fridgeButton = screen.getByText("Refrigerator")

    await userEvent.click(tvButton)
    expect(screen.queryAllByRole("button", { pressed: true }).length).toBe(1)

    await userEvent.click(fridgeButton)
    expect(screen.queryAllByRole("button", { pressed: true }).length).toBe(2)
  })

  test("should uncheck some heat items after click", async () => {
    render(
      <HeatComponentsSelector defaultValue={["Working Kitchen", "Computer"]} />
    )

    const tvButton = screen.getByText("Computer")
    const fridgeButton = screen.getByText("Working Kitchen")

    await userEvent.click(tvButton)
    expect(screen.queryAllByRole("button", { pressed: true }).length).toBe(1)

    await userEvent.click(fridgeButton)
    expect(screen.queryAllByRole("button", { pressed: true }).length).toBe(0)
  })
})
