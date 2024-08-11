"use client";

import { Calendar } from "@/components/ui/calendar";
import EventTrackerComponent from "../event-tracker/EvenTrackerComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { EventForm } from "@/components/forms/EventForm";
import { EventCard } from "@/components/cards/event-cards";
import { EventProps } from "../event-tracker/interface";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CalendarComponent() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [events, setEvents] = useState([]);

  const [showThisMonthEvents, setShowThisMonthEvents] = useState(false);

  const [doRefetchEvents, setDoRefetchEvents] = useState(true);
  useEffect(() => {
    if (doRefetchEvents) {
      setEvents(JSON.parse(localStorage.getItem("Events") || "[]"));
      setDoRefetchEvents(false);
    }
  }, [doRefetchEvents]);

  const EventCards = () => {
    return (
      (showThisMonthEvents && (
        <div className="flex flex-col gap-3">
          {events
            .filter((event: EventProps) => {
              return (
                new Date(event.eventDate).getMonth() === new Date().getMonth()
              );
            })
            .map((event: EventProps, index) => {
              return <EventCard key={`${index}-event-card`} props={event} />;
            })}
        </div>
      )) || (
        <div className="flex flex-col gap-3">
          {events.map((event: EventProps, index) => {
            return <EventCard key={`${index}-event-card`} props={event} />;
          })}
        </div>
      )
    );
  };
  return (
    <div className="flex flex-row px-4 justify-between">
      <div className="flex flex-col">
        <EventCards />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full rounded-md border p-4 gap-2 items-center">
          <Checkbox
            checked={showThisMonthEvents}
            onCheckedChange={() => {
              setShowThisMonthEvents(!showThisMonthEvents);
            }}
          />
          <span className="">Only show events for this month</span>
        </div>
        <Calendar className="border rounded-md" disabled />
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
                className="space-y-8"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
