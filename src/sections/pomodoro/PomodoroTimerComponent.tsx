"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";
import { TimerSettingSliderItem } from "./interface";
import { number } from "zod";
import { Input } from "@/components/ui/input";
import { PomodoroForm } from "@/components/forms/PomodoroForm";

export default function PomodoroTimerComponent() {
  const [time, setTime] = useState("00:00");
  const [arrayOfTime, setArrayOfTime] = useState<number[]>([]);

  const [pause, setPause] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (pause) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    let currentIndex = 0;
    let timeLeft = arrayOfTime[currentIndex];
    if (timeLeft == null) {
      return;
    }

    const updateTimer = () => {
      if (timeLeft <= 0) {
        currentIndex++;
        setTime("00:00");
        if (currentIndex >= arrayOfTime.length) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return;
        }
        timeLeft = arrayOfTime[currentIndex];
      }
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      setTime(
        `${minutes > 9 ? minutes : `0${minutes}`}:${
          seconds > 9 ? seconds : `0${seconds}`
        }`
      );
      timeLeft--;
    };

    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [pause, arrayOfTime]);

  return (
    <div className="size-full flex flex-col lg:flex-row gap-16 justify-center items-center">
      <div
        id="timer-section"
        className="flex flex-col w-full xl:w-4/5 gap-4 justify-center items-center"
      >
        <span className={`font-extrabold text-5xl lg:text-6xl xl:text-9xl`}>
          {time}
        </span>
      </div>
      <div
        id="settings-section"
        className="flex flex-row w-full xl:w-2/5 justify-center gap-10"
      >
        <PomodoroForm
          handleSubmit={() => {
            console.log(arrayOfTime);
          }}
          setArrayOfTime={setArrayOfTime}
          className="space-y-8 w-[400px]"
        />
      </div>
    </div>
  );
}
