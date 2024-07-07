"use client";

import { useEffect, useMemo, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const CountdownTimer = (endDate: string, paused: boolean) => {
  const parsedEndDate = useMemo(() => Date.parse(endDate), [endDate]);
  const timeLeft =
    parsedEndDate - Date.now() > 0 ? parsedEndDate - Date.now() : 0;
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    if (paused || timeLeft <= 0) {
      return;
    } else {
      const interval = setInterval(() => {
        const timeLeft = parsedEndDate - Date.now();
        if (timeLeft > 0) {
          setTime(parsedEndDate - Date.now());
        } else {
          setTime(0);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [paused]);

  return {
    days: (time / DAY).toFixed(),
    hours: ((time / HOUR) % 24).toFixed(),
    minutes: ((time / MINUTE) % 60).toFixed(),
    seconds: ((time / SECOND) % 60).toFixed(),
  };
};
