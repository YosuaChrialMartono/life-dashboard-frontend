"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useToast } from "../ui/use-toast";
import SaveToLocalStorage from "@/lib/saveToLocalStorage";

const formSchema = z.object({
  eventName: z.string().min(2).max(50),
  eventDate: z.date({
    required_error: "A date is required",
  }),
});

export function EventForm({
  handleSubmit,
  className,
}: {
  handleSubmit: Function;
  className: string;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      eventDate: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Event Created",
      description: `${values.eventName} at ${format(values.eventDate, "PPP")}`,
    });
    SaveToLocalStorage({
      key: "Events",
      value: JSON.stringify([values]),
      ignoreStoredValue: false,
    });
    handleSubmit();
  }

  const getYesterday = (dateOnly = false) => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return dateOnly ? new Date(d).toDateString() : d;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="21st birthday" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < getYesterday()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-extrabold">
          Submit
        </Button>
      </form>
    </Form>
  );
}
