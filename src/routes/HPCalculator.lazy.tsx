import { createLazyFileRoute } from "@tanstack/react-router"

import plugSvg from "@assets/plug.svg"
import lightningSvg from "@assets/conflict.svg"

import { BaseLayout } from "@layouts/BaseLayout"
import { Container } from "@/layouts/Container"
import { Banner } from "@/layouts/Banner"
import { Form } from "@/components/ui/form"

import { useHeatloadCalculator } from "@/hooks/useHeatloadCalculator"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react"
import { Modal } from "@/components/custom/Modal"
import { ACCalculator } from "@/components/custom/ACCalculator"
import { HeatloadCard } from "@/components/custom/HeatloadCard"
import { Separator } from "@/components/ui/separator"

export const Route = createLazyFileRoute("/HPCalculator")({
  component: HPCalculator,
})

function HPCalculator() {
  const [showModal, setShowModal] = useState(false)
  const { form, computedHorsePower, data, onSubmit, dispatch } =
    useHeatloadCalculator()

  const handleCalculate = useCallback(() => {
    setShowModal(form.formState.isValid)
  }, [form.formState.isValid])

  return (
    <BaseLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Banner>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-custom-blue-light w-[220px] h-[200px] flex items-center justify-center rounded-tr-[45%] rounded-br-[45%]">
                  <img src={plugSvg} width="100" alt="plug image" />
                </div>
                <h2 className="text-custom-blue-dark text-2xl font-bold pl-4 max-w-[250px]">
                  How much horsepower does my room need?
                </h2>
              </div>
              <Modal
                title="Computed heatload"
                showModal={showModal}
                triggerButton={{
                  name: "Calculate",
                  onClick: handleCalculate,
                }}
                handleClose={() => setShowModal(false)}
                icon={<img src={lightningSvg} alt="Lightning icon" />}
                content={
                  <>
                    <p className="font-bold text-2xl text-custom-black">
                      Awesome!
                    </p>
                    <p className="max-w-[240px]">
                      Keep your <strong>{data.area} sq.m area</strong>,{" "}
                      <strong>{data.unitType}</strong> type unit cool with a
                    </p>
                    <Separator />
                    <HeatloadCard
                      hpLevel={computedHorsePower.toString()}
                      dir="col"
                      isSuccess
                    />
                    <Separator />
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
            <ACCalculator form={form} dispatch={dispatch} />
          </Container>
        </form>
      </Form>
    </BaseLayout>
  )
}
