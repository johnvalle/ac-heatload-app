import roomSvg from "@assets/room.svg"
import peopleSvg from "@assets/people.svg"
import bulbSvg from "@assets/idea.svg"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UnitTypeSelect } from "@/components/custom/UnitType"
import { SunlightToggle } from "@/components/custom/SunlightToggle"
import { HeatComponentsSelector } from "@/components/custom/HeatComponents"
import { HeatItemCounter } from "@/components/custom/HeatItemCounter"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useHeatloadCalculator } from "@/hooks/useHeatloadCalculator"

type CalculatorHookValue = ReturnType<typeof useHeatloadCalculator>
type Props = {
  form: CalculatorHookValue["form"]
  dispatch: CalculatorHookValue["dispatch"]
}
export const ACCalculator = ({ form, dispatch }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <FormField
          name="area"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room area</FormLabel>
              <FormControl>
                <Input
                  min={0}
                  max={999}
                  type="number"
                  className="w-[285px]"
                  defaultValue=""
                  placeholder="Enter room size in sq.m."
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  maxLength={50}
                  placeholder="Enter room name"
                  className="w-[285px]"
                  {...field}
                />
              </FormControl>
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
      <div className="flex flex-col gap-4">
        <Label htmlFor="name">Is the room hit by direct sunlight?</Label>
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
  )
}
