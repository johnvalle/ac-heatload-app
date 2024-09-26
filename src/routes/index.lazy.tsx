import { CheckCheck, EyeIcon, TriangleAlert, X } from "lucide-react"
import { createLazyFileRoute, Link } from "@tanstack/react-router"

import plugSvg from "@/assets/plug.svg"
import rulerSvg from "@/assets/ruler.svg"
import { useStorage } from "@/hooks/useStorage"
import { BaseLayout } from "@/layouts/BaseLayout"
import { Container } from "@/layouts/Container"

export const Route = createLazyFileRoute("/")({
  component: Home,
})

function Home() {
  const { storedData, removeResult } = useStorage()

  return (
    <BaseLayout>
      <Container>
        <div className="text-start pt-10">
          <h2 className="font-bold text-2xl text-custom-black">
            Let's get started
          </h2>
          <h3 className="text-2xl text-custom-black">
            What do you want to know?
          </h3>
        </div>
        <div className="flex gap-11 py-12">
          <Link to="/ACCalculator">
            <div className="flex relative bg-custom-blue-light w-[240px] h-[285px] p-9 rounded-[36px] cursor-pointer hover:-translate-y-2 ease-linear duration-100">
              <img
                className="absolute -top-8 left-4"
                src={plugSvg}
                alt="plug image"
                width="200"
              />
              <p className="text-custom-blue-dark font-bold text-[20px] mt-auto">
                How much HP for my room?
              </p>
            </div>
          </Link>
          <Link to="/ACValidator">
            <div className="flex relative bg-custom-green-light w-[240px] h-[285px] p-9 rounded-[36px] cursor-pointer hover:-translate-y-2 ease-linear duration-100">
              <img
                className="absolute -top-8 left-4"
                src={rulerSvg}
                alt="plug image"
                width="200"
              />
              <p className="text-custom-green-dark font-bold text-[20px] mt-auto">
                Do I have the right AC for my room?
              </p>
            </div>
          </Link>
        </div>
        <h3 className="text-2xl text-custom-black">Saved calculations</h3>
        <div className="flex gap-4 flex-wrap my-4">
          {!!storedData.calculations.length &&
            storedData.calculations.map(
              ({ name, computedHorsePower, area, date }) => (
                <div
                  key={date}
                  className="flex justify-between items-center rounded-full border border-custom-gray-stroke px-4 h-[50px] min-w-[320px]"
                >
                  <div className="flex gap-4">
                    <span className="font-bold">{name}</span>
                    <span>
                      {computedHorsePower} HP - {area} sq.m
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-custom-gray-bg w-[30px] h-[30px] flex items-center justify-center">
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => removeResult("calculations", date)}
                      className="rounded-full bg-custom-gray-bg w-[30px] h-[30px] flex items-center justify-center"
                    >
                      <X />
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
        <h3 className="text-2xl text-custom-black">Saved validations</h3>
        <div className="flex gap-4 flex-wrap my-4">
          {!!storedData.validations.length &&
            storedData.validations.map(
              ({ isHpMatched, name, computedHorsePower, area }) => (
                <div className="flex gap-2 justify-between items-center rounded-full border border-custom-gray-stroke px-4 h-[50px] min-w-[320px]">
                  {isHpMatched ? (
                    <div className="bg-custom-green-light rounded-full p-2 items-center flex justify-center">
                      <CheckCheck className="w-4 h-4 stroke-custom-green-dark" />
                    </div>
                  ) : (
                    <div className="bg-custom-yellow-light rounded-full p-2 items-center flex justify-center">
                      <TriangleAlert className="w-4 h-4 stroke-custom-black" />
                    </div>
                  )}
                  <div className="flex gap-4">
                    <span className="font-bold">{name}</span>
                    <span>
                      {computedHorsePower} HP - {area} sq.m
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-full bg-custom-gray-bg w-[30px] h-[30px] flex items-center justify-center">
                      <EyeIcon />
                    </button>
                    <button className="rounded-full bg-custom-gray-bg w-[30px] h-[30px] flex items-center justify-center">
                      <X />
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
      </Container>
    </BaseLayout>
  )
}
