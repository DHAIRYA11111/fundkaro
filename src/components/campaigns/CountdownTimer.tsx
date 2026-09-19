"use client";

import { useEffect, useState } from "react";
import { getTimeRemaining } from "@/lib/utils";

interface CountdownTimerProps {
  endsAt: string;
}

export default function CountdownTimer({ endsAt }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endsAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(endsAt));
    }, 1000);

    return () => clearInterval(timer);
  }, [endsAt]);

  if (timeLeft.isExpired) {
    return (
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
        <p className="text-slate-500 font-semibold uppercase tracking-wider text-sm">Campaign Ended</p>
      </div>
    );
  }

  const isUrgent = timeLeft.days < 2;

  if (isUrgent) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-center">
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex-1">
            <span className="block text-3xl font-bold text-red-600">
              {timeLeft.days * 24 + timeLeft.hours}
            </span>
            <span className="block text-xs uppercase text-red-400 font-medium mt-1">Hours</span>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex-1">
            <span className="block text-3xl font-bold text-red-600">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className="block text-xs uppercase text-red-400 font-medium mt-1">Mins</span>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex-1">
            <span className="block text-3xl font-bold text-red-600">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className="block text-xs uppercase text-red-400 font-medium mt-1">Secs</span>
          </div>
        </div>
        <p className="text-center text-sm font-medium text-red-500">Ending soon!</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 text-center">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex-1">
        <span className="block text-2xl font-bold text-slate-800">{timeLeft.days}</span>
        <span className="block text-[10px] uppercase text-slate-500 font-medium mt-1">Days</span>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex-1">
        <span className="block text-2xl font-bold text-slate-800">{timeLeft.hours}</span>
        <span className="block text-[10px] uppercase text-slate-500 font-medium mt-1">Hours</span>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex-1">
        <span className="block text-2xl font-bold text-slate-800">{timeLeft.minutes}</span>
        <span className="block text-[10px] uppercase text-slate-500 font-medium mt-1">Mins</span>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex-1">
        <span className="block text-2xl font-bold text-slate-800">{timeLeft.seconds}</span>
        <span className="block text-[10px] uppercase text-slate-500 font-medium mt-1">Secs</span>
      </div>
    </div>
  );
}
