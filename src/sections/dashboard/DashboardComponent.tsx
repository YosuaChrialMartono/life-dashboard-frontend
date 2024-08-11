import { EventCard } from "@/components/cards/event-cards";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { EventProps } from "../event-tracker/interface";
import Link from "next/link";

export default function DashboardComponent() {
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
      <div className="flex flex-col gap-3">
        {events.map((event: EventProps, index) => {
          if (index > 2) return null;
          return <EventCard key={`${index}-event-card`} props={event} />;
        })}
      </div>
    );
  };
  return (
    <div className="size-full p-4 flex flex-col lg:flex-row gap-4 justify-between">
      <Card className="w-full h-max lg:size-max">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Calendar />
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="size-max lg:flex-grow w-full lg:max-h-full lg:overflow-auto">
        <CardHeader>
          <CardTitle>Top 3 Events</CardTitle>
          <Link href={"/events"}>See more {">"}</Link>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {events.length === 0 && (
              <div className="text-center">No events to show</div>
            )}
            <EventCards />
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="h-max">
        <CardHeader>
          <CardTitle>Pomodoro Timer</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Link href={"/pomodoro"}>Go to Pomodoro Timer {">"}</Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
