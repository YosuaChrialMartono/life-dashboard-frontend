"use client";

import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "../ui/slider";
import { TimerSettingSliderItem } from "@/sections/pomodoro/interface";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  workDuration: z.number().min(15).max(60),
  shortRestDuration: z.number().min(5).max(30),
  longRestDuration: z.number().min(30).max(45),
  sessionCount: z
    .number({
      required_error: "Session count is required",
      invalid_type_error: "Session count must be a number",
    })
    .min(1, {
      message: "Minimum session count is 1",
    }),
  useTransition: z.boolean(),
});

export function PomodoroForm({
  handleSubmit,
  setArrayOfTime,
  className,
}: {
  handleSubmit: Function;
  setArrayOfTime: Function;
  className: string;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workDuration: 15,
      shortRestDuration: 5,
      longRestDuration: 30,
      sessionCount: 1,
      useTransition: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      workDuration,
      shortRestDuration,
      longRestDuration,
      sessionCount,
      useTransition,
    } = values;
    let arrayOfTime: number[] = [];

    for (let index = 0; index < sessionCount * 2 - 1; index++) {
      console.log(index);
      if (useTransition) {
        arrayOfTime.push(5);
      }
      if (index % 2 == 0) {
        arrayOfTime.push(workDuration * 60);
      } else if (index % 7 == 0) {
        arrayOfTime.push(longRestDuration * 60);
      } else {
        arrayOfTime.push(shortRestDuration * 60);
      }
    }

    console.log(arrayOfTime);
    setArrayOfTime(arrayOfTime);

    toast({
      title: "Starting Timer",
      description: `${sessionCount} session totaling to ${(
        arrayOfTime.reduce((prevSum, item) => prevSum + item, 0) / 60
      ).toFixed()} minutes ${useTransition ? "using transition" : ""}`,
    });

    handleSubmit();
  }

  const timerSettings: TimerSettingSliderItem[] = [
    {
      name: "workDuration",
      title: "Work Duration",
      min: 15,
      max: 60,
      step: 5,
    },
    {
      name: "shortRestDuration",
      title: "Short Rest Duration",
      min: 5,
      max: 30,
      step: 5,
    },
    {
      name: "longRestDuration",
      title: "Long Rest Duration",
      min: 30,
      max: 45,
      step: 5,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {timerSettings.map((setting) => (
          <FormField
            key={`${setting.name}-slider`}
            control={form.control}
            name={setting.name}
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between w-full">
                  <FormLabel>{setting.title}</FormLabel>
                  <span>{field.value}</span>
                </div>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    onValueChange={(event) => field.onChange(event[0])}
                    max={setting.max}
                    min={setting.min}
                    step={setting.step}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="sessionCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Count</FormLabel>
              <FormControl>
                <Input
                  placeholder="1"
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(parseInt(event.target.value) || "")
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="useTransition"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Use Transition</FormLabel>
                <FormDescription>
                  Give 5 seconds in transition between each session
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          Start Timer
        </Button>
      </form>
    </Form>
  );
}
