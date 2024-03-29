import React, { useEffect, useState } from "react";
import { InputText } from "@/components";

export const InputTime: React.FC<unknown> = () => {
  let timerID: number;

  const [timeValue, setTime] = useState(0);

  useEffect(() => {
    timerID = window.setInterval(() => tick(), 1000);
    return function clear() {
      clearInterval(Number(timerID));
      timerID = 0;
    };
  }, [timeValue]);

  const moment = (timeSeconds: number): string => {
    function num(val: number) {
      val = Math.floor(val);
      return val < 10 ? "0" + val : val;
    }
    const hours = (timeSeconds / 3600) % 24;
    const minutes = (timeSeconds / 60) % 60;
    const seconds = timeSeconds % 60;
    return `${num(hours)}:${num(minutes)}:${num(seconds)}`;
  };

  const tick = (): void => {
    setTime(timeValue + 1);
  };

  return (
    <InputText
      data-testid="inputTime"
      readOnly
      type="text"
      valueInput={moment(timeValue)}
    />
  );
};
