"use client";
import { EventForm } from "@/components/forms/EventForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { EventProps } from "./interface";
import { format } from "date-fns";

export default function EventTrackerComponent() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [doRefetchEvents, setDoRefetchEvents] = useState(true);
  useEffect(() => {
    if (doRefetchEvents) {
      setEvents(JSON.parse(localStorage.getItem("Events") || "[]"));
      setDoRefetchEvents(false);
    }
  }, [doRefetchEvents]);

  const EventCards = () => {
    return (
      <div className="flex flex-col">
        {events.map((event: EventProps) => {
          console.log(event.eventName);
          return (
            <div>
              <span>{event.eventName}</span>
              <span>{format(event.eventDate, "PPP")}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-4">
      <EventCards />
      <Dialog open={dialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="font-extrabold"
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Add new Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <EventForm
              handleSubmit={() => {
                setDoRefetchEvents(true);
                setDialogOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
