import { createLazyFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Form } from "@/components/ui/form"

import rulerSvg from "@/assets/ruler.svg"
import checkSvg from "@/assets/check.svg"

import { ACCalculator } from "@/components/custom/ACCalculator"
import { Modal } from "@/components/custom/Modal"
import { Button } from "@/components/ui/button"
import { useHeatloadCalculator } from "@/hooks/useHeatloadCalculator"
import { Banner } from "@/layouts/Banner"
import { BaseLayout } from "@/layouts/BaseLayout"
import { Container } from "@/layouts/Container"
import { HeatloadCard } from "@/components/custom/HeatloadCard"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

export const Route = createLazyFileRoute("/ACValidator")({
  component: ACValidator,
})

function ACValidator() {
  const [showModal, setShowModal] = useState(false)
  const [sliderValue, setSliderValue] = useState(0.5)
  const { form, computedHeatload, data, onSubmit, dispatch } =
    useHeatloadCalculator()

  return (
    <BaseLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Banner>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-custom-green-light w-[220px] h-[200px] flex items-center justify-center rounded-tr-[45%] rounded-br-[45%]">
                  <img src={rulerSvg} width="100" alt="plug image" />
                </div>
                <h2 className="text-custom-green-dark text-2xl font-bold pl-4 max-w-[250px]">
                  Do I have the right AC for my room?
                </h2>
              </div>
              <Modal
                title="Validated heatload"
                showModal={showModal}
                triggerButton={{
                  name: "Validate",
                  onClick: () => setShowModal(form.formState.isValid),
                }}
                handleClose={() => setShowModal(false)}
                icon={<img src={checkSvg} alt="Check icon" />}
                content={
                  <>
                    <p className="font-bold text-2xl text-custom-black">
                      Awesome!
                    </p>
                    <p className="max-w-[240px]">
                      Keep your <strong>{data.area} sq.m area</strong>,{" "}
                      <strong>{data.unitType}</strong> type unit cool with a
                    </p>
                    <div className="border-t border-b border-custom-gray-stroke py-4 w-full flex flex-col justify-center items-center">
                      <div className="w-[72px] h-[72px] text-[32px] p-4 rounded-full bg-custom-green-light flex items-center justify-center">
                        <p className="text-custom-black font-bold">
                          {Math.round(computedHeatload / 3165) / 2}
                        </p>
                      </div>
                      <p className="font-bold">Horsepower</p>
                      <p>Air-conditioner ({computedHeatload})</p>
                    </div>
                    <p className="text-custom-black text-xs">
                      We recommend this because there are usually{" "}
                      <span className="font-bold">
                        {data.personCount} people
                      </span>{" "}
                      in the room
                      {!!data.heatItems.length && " with "}
                      {!!data.heatItems.length && (
                        <span className="font-bold">
                          {data.heatItems.join(", ")}
                        </span>
                      )}
                      {data.windowCount > 0 && (
                        <span className="font-bold">
                          {`, ${data.windowCount} windows, `}
                        </span>
                      )}
                      {data.bulbCount > 0 && (
                        <span className="font-bold">{`${data.bulbCount} bulb${data.bulbCount > 1 ? "s" : ""}`}</span>
                      )}
                      {data.hasDirectSunlight && ", hit by direct sunlight"}.
                    </p>
                  </>
                }
                footer={
                  <>
                    <Button type="submit" className="align-center rounded-full">
                      Save calculation
                    </Button>
                    <Button variant="link" onClick={() => setShowModal(false)}>
                      Oops! Let me fix something
                    </Button>
                  </>
                }
              />
            </div>
          </Banner>
          <Container className="py-8 pb-20">
            <Label>Input current AC Horsepower</Label>
            <div className="flex h-[72px]">
              <div className="w-auto">
                <HeatloadCard dir="row" isSuccess={false} />
              </div>
              <Separator orientation="vertical" className="mx-4" />
              <Slider
                tooltip={sliderValue.toString()}
                className="w-[450px]"
                defaultValue={[sliderValue]}
                min={0}
                max={3}
                step={0.5}
                onValueChange={(value) => setSliderValue(value[0])}
              />
            </div>
            <ACCalculator form={form} dispatch={dispatch} />
          </Container>
        </form>
      </Form>
    </BaseLayout>
  )
}
