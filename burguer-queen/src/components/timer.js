import React, { useState, useEffect } from "react";

const Timer = ({ dataCurrentOrder }) => {
    const [countSecond, setcountSecond] = useState(new Date().getSeconds());
    const [countMinute, setcountMinute] = useState(new Date().getMinutes());
    const [countHour, setcountHour] = useState(new Date().getHours());

    const initialDateHour = new Date(dataCurrentOrder).getHours(); // volver a date hora de orden
    const initialDateMinute = new Date(dataCurrentOrder).getMinutes(); // volver a date minutos de orden
    const initialDateSecond = new Date(dataCurrentOrder).getSeconds(); // volver a date segundos de orden

    const timeHandle = () => {
        const currentDate = new Date();
        const orderDate = new Date(dataCurrentOrder);
        const resta = new Date(currentDate.getTime() - orderDate.getTime());
        setcountHour(resta.getHours() - 19);
        setcountMinute(resta.getMinutes());
        setcountSecond(resta.getSeconds());
    };

    const changeTime = setInterval(() => {
        timeHandle();
    }, 1000);

    return (
        <>
            {/* <p>
                {" "}
                hora actual{" "}
                {`${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()} `}
            </p> */}
            <div>
                <p>
                    {`${countHour} : ${countMinute} : ${countSecond} `}
                </p>
            </div>
        </>
    );
};
export default Timer;
