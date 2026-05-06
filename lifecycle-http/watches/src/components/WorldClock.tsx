import React, { useEffect, useState } from 'react';
import { CityClock, ClockTime } from '../types';


interface WorldClockProps {
    clock: CityClock;
    onRemove: (id: number) => void;
}

const WorldClock: React.FC<WorldClockProps> = ({ clock, onRemove }) => {
    const [time, setTime] = useState<ClockTime>({ hours: 0, minutes: 0, seconds: 0 });

    const calculateTime = (): ClockTime => {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const cityTime = new Date(utc + clock.timezoneOffset * 3600000);

        return {
            hours: cityTime.getHours(),
            minutes: cityTime.getMinutes(),
            seconds: cityTime.getSeconds()
        };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTime());
        }, 1000);

        setTime(calculateTime());

        return () => {
            clearInterval(interval);
        };
    }, [clock.timezoneOffset]);

    const secondDegrees = time.seconds * 6; // 360 / 60 = 6 градусов в секунду
    const minuteDegrees = time.minutes * 6 + time.seconds * 0.1;
    const hourDegrees = (time.hours % 12) * 30 + time.minutes * 0.5;

    return (
        <div className="clock-card">
            <button className="remove-btn" onClick={() => onRemove(clock.id)}>×</button>
            <div className="clock-title">{clock.name}</div>
            <div className="analog-clock">
                <div className="clock-face">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="hour-marker"
                            style={{ transform: `rotate(${i * 30}deg)` }}
                        >
                            <div className="marker-line"></div>
                        </div>
                    ))}

                    <div className="center-point"></div>

                    <div
                        className="hour-hand"
                        style={{ transform: `rotate(${hourDegrees}deg)` }}
                    />

                    <div
                        className="minute-hand"
                        style={{ transform: `rotate(${minuteDegrees}deg)` }}
                    />

                    <div
                        className="second-hand"
                        style={{ transform: `rotate(${secondDegrees}deg)` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default WorldClock;