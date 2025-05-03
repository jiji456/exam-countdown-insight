
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  onComplete?: () => void;
  className?: string;
}

const CountdownTimer = ({ targetDate, onComplete, className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        onComplete?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (isExpired) {
    return (
      <div className={`flex items-center justify-center text-theme-secondary font-medium ${className}`}>
        ผลสอบพร้อมให้ดูแล้ว!
      </div>
    );
  }

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {timeLeft.days > 0 && (
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 min-w-[2rem] text-center animate-countdown-flash">
            {formatNumber(timeLeft.days)}
          </div>
          <span className="text-xs text-gray-500">วัน</span>
        </div>
      )}
      
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 min-w-[2rem] text-center animate-countdown-flash">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-xs text-gray-500">ชม.</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 min-w-[2rem] text-center animate-countdown-flash">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-xs text-gray-500">นาที</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1 min-w-[2rem] text-center animate-countdown-flash">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-xs text-gray-500">วิ</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
