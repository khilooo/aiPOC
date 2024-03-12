import React, {useEffect, useState} from "react";


function Register(props) {
    const [selectedDay, setSelectedDay] = useState(props.selectedDay || undefined);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const nextDayInWeek = new Date(now);

            if (props.selectedDay === "monday") {
                nextDayInWeek.setDate(nextDayInWeek.getDate() + (1 + (7 - nextDayInWeek.getDay())) % 7);
            } else if (props.selectedDay === "wednesday") {
                nextDayInWeek.setDate(nextDayInWeek.getDate() + (3 + (7 - nextDayInWeek.getDay())) % 7);
            } else if (props.selectedDay === "friday") {
                nextDayInWeek.setDate(nextDayInWeek.getDate() + (5 + (7 - nextDayInWeek.getDay())) % 7);
            }
            // Adjust for Israel time zone (IST)
            nextDayInWeek.setHours(12,0,0,0);

            const difference = nextDayInWeek - now;

            let days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if(now.getDay() === 0) {
                days =0
            }

            setCountdown({ days, hours, minutes, seconds })
        };

        calculateCountdown();
        const intervalId = setInterval(calculateCountdown, 1000);

        return () => clearInterval(intervalId);
    }, [props.selectedDay]);
    return registerIsOpen(props.selectedDay,countdown);



}

function registerIsOpen( selectedDay,countdown) {
    const currentDate = new Date();
    const isMonday = currentDate.getDay() === 1;
    const isSunday = currentDate.getDay() === 0;
    const isTuesday = currentDate.getDay() === 2;
    const isWednesday = currentDate.getDay() === 3;
    const isThursday = currentDate.getDay() === 4;
    const isFriday = currentDate.getDay() === 5;
    const isAfterNoon = isSunday ? currentDate.getHours() >= 12 : true;

    if (selectedDay === "monday" && (isMonday || isSunday) && isAfterNoon) {
        return <div><h1>Register Bitch</h1>
            <button>In</button>
        </div>;
    }

    if (selectedDay === "wednesday" && (isTuesday || isWednesday) && isAfterNoon) {
        return <div><h1>Register Bitch</h1>
            <button>In</button>
        </div>;
    }

    if (selectedDay === "friday" && (isThursday || isFriday) && isAfterNoon) {
        return <div><h1>Register Bitch</h1>
            <button>In</button>
        </div>;
    }


    if(selectedDay) {
        return <div>
            <h2>Countdown to Next Register </h2>
            <div>
                <span>{countdown.days} days</span>
                <span>{countdown.hours} hours</span>
                <span>{countdown.minutes} minutes</span>
                <span>{countdown.seconds} seconds</span>
            </div>
        </div>
    }


}
export default Register;