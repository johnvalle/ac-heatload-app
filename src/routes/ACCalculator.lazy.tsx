import { useCallback, useState } from "react"
import { createLazyFileRoute } from "@tanstack/react-router"

import lightningSvg from "@/assets/conflict.svg"
import plugSvg from "@/assets/plug.svg"
import { Calculator } from "@/components/custom/Calculator"
import { HeatloadCard } from "@/components/custom/HeatloadCard"
import { Modal } from "@/components/custom/Modal"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { useHeatloadCalculator } from "@/hooks/useHeatloadCalculator"
import { Banner } from "@/layouts/Banner"
import { BaseLayout } from "@/layouts/BaseLayout"
import { Container } from "@/layouts/Container"

export const Route = createLazyFileRoute("/ACCalculator")({
  component: ACCalculator,
})

function ACCalculator() {
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
            <Calculator form={form} dispatch={dispatch} />
          </Container>
        </form>
      </Form>
    </BaseLayout>
  )
}
