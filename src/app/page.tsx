"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center gap-4">
      <Button
        className="font-extrabold"
        onClick={() => {
          router.push("pomodoro");
        }}
      >
        Go to Pomodoro Timer
      </Button>
      <Button
        className="font-extrabold"
        onClick={() => {
          router.push("calendar/event-tracker");
        }}
      >
        Go to Event Tracker
      </Button>
    </div>
  );
}
