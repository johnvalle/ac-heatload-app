import { createLazyFileRoute } from "@tanstack/react-router"

import plugSvg from "@assets/plug.svg"
import roomSvg from "@assets/room.svg"
import peopleSvg from "@assets/people.svg"
import bulbSvg from "@assets/idea.svg"

import { Button } from "@components/ui/button"

import { BaseLayout } from "@layouts/BaseLayout"
import { Container } from "@/layouts/Container"
import { Banner } from "@/layouts/Banner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UnitTypeSelect } from "@/components/custom/UnitType"
import { SunlightToggle } from "@/components/custom/SunlightToggle"
import { HeatComponentsSelector } from "@/components/custom/HeatComponents"
import { HeatItemCounter } from "@/components/custom/HeatItemCounter"

export const Route = createLazyFileRoute("/HPCalculator")({
  component: HPCalculator,
})

function HPCalculator() {
  return (
    <BaseLayout>
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
          <Button>Calculate</Button>
        </div>
      </Banner>
      <Container className="py-8 pb-20">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div>
              <Label htmlFor="area">Enter room area (sq.m)*</Label>
              <Input id="area" required className="w-[285px]" />
            </div>
            <div>
              <Label htmlFor="name">Enter room name</Label>
              <Input id="name" required className="w-[285px]" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Select unit type</Label>
            <div className="flex gap-4">
              <UnitTypeSelect />
            </div>
          </div>
          <div>
            <Label htmlFor="name">Is the room hit by direct sunlight?</Label>
            <SunlightToggle />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Select all items in the room</Label>
            <div className="gap-4 flex">
              <HeatComponentsSelector />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Select all items in the room</Label>
            <div className="flex gap-12">
              <HeatItemCounter
                icon={roomSvg}
                alt="room icon"
                name="Number of windows"
                defaultValue={0}
                min={0}
                max={10}
              />
              <HeatItemCounter
                icon={peopleSvg}
                alt="person icon"
                name="Number of people"
                defaultValue={2}
                min={2}
                max={10}
              />
              <HeatItemCounter
                icon={bulbSvg}
                alt="bulb icon"
                name="Number of light bulbs"
                defaultValue={0}
                min={0}
                max={10}
              />
            </div>
          </div>
        </div>
      </Container>
    </BaseLayout>
  )
}
