import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import userEvent from "@testing-library/user-event"
import { HeatItemCounter } from "@/components/custom/HeatItemCounter"
import peopleSvg from "@assets/people.svg"

describe("Heat item counter component", () => {
  const renderComponent = () =>
    render(
      <HeatItemCounter
        alt="people icon"
        icon={peopleSvg}
        max={5}
        min={2}
        defaultValue={2}
        name="Number of people"
      />
    )

  test("should correctly render the component", async () => {
    renderComponent()

    expect(screen.getByLabelText("increase")).toBeDefined()
    expect(screen.getByLabelText("decrease")).toBeDefined()

    expect(screen.getByText("Number of people")).toBeDefined()
  })

  test("should increase or decrease value on button click", async () => {
    renderComponent()

    const add = screen.getByLabelText("increase")
    const remove = screen.getByLabelText("decrease")

    await userEvent.click(add)
    await userEvent.click(add)

    expect(screen.getByText("4", { exact: true })).toBeDefined()

    await userEvent.click(remove)

    expect(screen.getByText("3", { exact: true })).toBeDefined()
  })

  test("should not exceed max or be under min", async () => {
    renderComponent()

    const add = screen.getByLabelText("increase")
    const remove = screen.getByLabelText("decrease")

    await userEvent.click(add)
    await userEvent.click(add)
    await userEvent.click(add)
    await userEvent.click(add)

    // assert that increase button should be hidden
    expect(
      screen.queryAllByRole("button", { name: "increase", hidden: true })
    ).toBeTruthy()

    expect(
      screen.queryAllByText("6", { exact: true }).length
    ).not.toBeGreaterThanOrEqual(1)

    await userEvent.click(remove)
    await userEvent.click(remove)
    await userEvent.click(remove)

    // assert that decrease button should be hidden
    expect(
      screen.queryAllByRole("button", { name: "decrease", hidden: true })
    ).toBeTruthy()

    expect(screen.getByText("2", { exact: true })).toBeDefined()
  })
})
