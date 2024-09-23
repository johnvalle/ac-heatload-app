import { ArrowRight } from "lucide-react"
import { useCallback, useState } from "react"
import { createLazyFileRoute } from "@tanstack/react-router"

import catSvg from "@/assets/cat.svg"
import checkSvg from "@/assets/check.svg"
import rulerSvg from "@/assets/ruler.svg"
import { Calculator } from "@/components/custom/Calculator"
import { HeatloadCard } from "@/components/custom/HeatloadCard"
import { Modal } from "@/components/custom/Modal"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { useHeatloadCalculator } from "@/hooks/useHeatloadCalculator"
import { Banner } from "@/layouts/Banner"
import { BaseLayout } from "@/layouts/BaseLayout"
import { Container } from "@/layouts/Container"

export const Route = createLazyFileRoute("/ACValidator")({
  component: ACValidator,
})

function ACValidator() {
  const [showModal, setShowModal] = useState(false)
  const [sliderValue, setSliderValue] = useState(0.5)
  const { form, computedHorsePower, data, onSubmit, dispatch } =
    useHeatloadCalculator()

  const isHpMatched = computedHorsePower === sliderValue

  const handleCalculate = useCallback(() => {
    setShowModal(form.formState.isValid)
  }, [form.formState.isValid])

  const matchedHpContent = () => {
    return (
      <>
        <p className="font-bold text-2xl text-custom-black">Perfect!</p>
        <p className="max-w-[240px]">
          Your <span className="font-bold">{sliderValue}</span> HP
          air-conditioner is perfect for your{" "}
          <strong>{data.area} sq.m area</strong>,{" "}
          <strong>{data.unitType}</strong> unit.
        </p>
      </>
    )
  }

  const unmatchedHpContent = () => {
    return (
      <>
        <p className="font-bold text-2xl text-custom-black">Uh oh...</p>
        <p className="max-w-[240px]">
          It seems like your current setup may not be the best setup.
        </p>
        <div className="border-t border-b border-custom-gray-stroke py-4 w-full flex flex-col justify-center items-center">
          <div className="flex gap-4 items-center justify-center">
            <HeatloadCard
              hpLevel={sliderValue.toString()}
              dir="col"
              isSuccess={false}
            />
            <ArrowRight className="h-12 w-12" />
            <HeatloadCard
              hpLevel={computedHorsePower.toString()}
              dir="col"
              isSuccess
            />
          </div>
        </div>
        <div>
          <p className="text-custom-black">
            We suggest increasing your setup from
          </p>
          <p>
            <span className="font-bold">{sliderValue.toString()} HP</span>
            &nbsp;to&nbsp;
            <span className="font-bold">{computedHorsePower} HP.</span>
          </p>
          <Button
            variant="link"
            className="underline"
            onClick={() => setShowModal(false)}
          >
            See how we got this result
          </Button>
        </div>
      </>
    )
  }

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
                  onClick: handleCalculate,
                }}
                handleClose={() => setShowModal(false)}
                icon={
                  <img
                    src={isHpMatched ? checkSvg : catSvg}
                    alt={isHpMatched ? "check icon" : "cat icon"}
                  />
                }
                content={
                  isHpMatched ? matchedHpContent() : unmatchedHpContent()
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
                <HeatloadCard
                  hpLevel={sliderValue.toString()}
                  dir="row"
                  isSuccess={false}
                />
              </div>
              <Separator orientation="vertical" className="mx-4" />
              <Slider
                className="w-[450px]"
                defaultValue={[sliderValue]}
                min={0.5}
                max={3}
                step={0.5}
                onValueChange={(value) => setSliderValue(value[0])}
              />
            </div>
            <Calculator form={form} dispatch={dispatch} />
          </Container>
        </form>
      </Form>
    </BaseLayout>
  )
}
