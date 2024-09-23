import { createLazyFileRoute, Link } from "@tanstack/react-router"

import plugSvg from "@/assets/plug.svg"
import rulerSvg from "@/assets/ruler.svg"
import { BaseLayout } from "@/layouts/BaseLayout"
import { Container } from "@/layouts/Container"

export const Route = createLazyFileRoute("/")({
  component: Home,
})

function Home() {
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
      </Container>
    </BaseLayout>
  )
}
