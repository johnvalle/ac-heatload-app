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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useHeatloadCalculator } from "@/hooks/useHeatloadCalculator"

export const Route = createLazyFileRoute("/HPCalculator")({
  component: HPCalculator,
})

function HPCalculator() {
  const { form, onSubmit, dispatch } = useHeatloadCalculator()

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
              <Button type="submit">Calculate</Button>
            </div>
          </Banner>
          <Container className="py-8 pb-20">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <FormField
                  name="area"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter room area</FormLabel>
                      <FormControl>
                        <Input
                          min={0}
                          max={999}
                          type="number"
                          className="w-[285px]"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the room area in sq.m.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter room name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          maxLength={50}
                          className="w-[285px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The name of your room when saved.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="name">Select unit type</Label>
                <div className="flex gap-4">
                  <UnitTypeSelect
                    onChange={(value) =>
                      dispatch({ type: "SetUnitType", payload: value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="name">
                  Is the room hit by direct sunlight?
                </Label>
                <SunlightToggle
                  onChange={(value) =>
                    dispatch({
                      type: "SetHasDirectSunlight",
                      payload: value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="name">Select all items in the room</Label>
                <div className="gap-4 flex">
                  <HeatComponentsSelector
                    onChange={(value) =>
                      dispatch({
                        type: "SetHeatItems",
                        payload: value,
                      })
                    }
                  />
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
                    onChange={(value) =>
                      dispatch({ type: "SetWindowCount", payload: value })
                    }
                  />
                  <HeatItemCounter
                    icon={peopleSvg}
                    alt="person icon"
                    name="Number of people"
                    defaultValue={2}
                    min={2}
                    max={10}
                    onChange={(value) =>
                      dispatch({ type: "SetPersonCount", payload: value })
                    }
                  />
                  <HeatItemCounter
                    icon={bulbSvg}
                    alt="bulb icon"
                    name="Number of light bulbs"
                    defaultValue={0}
                    min={0}
                    max={10}
                    onChange={(value) =>
                      dispatch({ type: "SetBulbCount", payload: value })
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        </form>
      </Form>
    </BaseLayout>
  )
}
