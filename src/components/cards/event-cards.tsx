import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "../ui/card";
import { EventCardProps } from "./interface";
import { CountdownTimer } from "../countdown-timer";

export function EventCard({ props }: { props: EventCardProps }) {
  const { days, hours, minutes, seconds } = CountdownTimer(
    String(props.eventDate),
    false
  );
  return (
    <Card>
      <CardHeader>
        <span className="font-extrabold">{props.eventName}</span>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <span>{format(props.eventDate, "PPP")}</span>
        </div>
        <span className="font-extrabold text-3xl">
          {days} : {hours.length == 1 ? `0${hours}` : hours} :{" "}
          {minutes.length == 1 ? `0${minutes}` : minutes} :{" "}
          {seconds.length == 1 ? `0${seconds}` : seconds}
        </span>
      </CardContent>
    </Card>
  );
}
