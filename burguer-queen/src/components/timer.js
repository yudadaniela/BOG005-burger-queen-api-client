import React, { useState, useEffect } from "react";



const Timer = ({ dataCurrentOrder }) => {

    const [timeShowed, setTimeShowed] = useState(''); // ordenes actuales
    // const [countSecond, setcountSecond] = useState(0);
    // const [countMinute, setcountMinute] = useState(0);
    // const [countHour, setcountHour] = useState(0);
    //let countSecond = 0;
    //let countMinute = 0;
    //let countHour = 0;
    const getDate = () => new Date().toString();

    const timeHandle = () => {
        //console.log(dataCurrentOrder, 'lo que entra');

        const [h1, m1, s1] = dataCurrentOrder.split(' ')[4].split(':')
        const [h2, m2, s2] = getDate().split(' ')[4].split(':')
        //console.log([h1, m1, s1], 'h1,m1,s1');
        //console.log([h2, m2, s2], 'h2,m2,s2');
        let cronometro = `${Math.abs([h1, m1, s1][0] - [h2, m2, s2][0])} : ${Math.abs([h1, m1, s1][1] - [h2, m2, s2][1])} : ${Math.abs([h1, m1, s1][2] - [h2, m2, s2][2])} `
        
        //   // console.log(calculoInicial, 'inicial', calculoFinal,'final');
        console.log(cronometro, 'diferencia en horas');
        setTimeShowed(cronometro)
        /////setcountSecond(countSecond +1)
        // if(countSecond  > 60){
        //     setcountMinute(countMinute ++)
        //     setcountSecond(countSecond =0)
        // }
        // if(countMinute>60){
        //     setcountHour(countHour ++)
        //     setcountMinute(countMinute =0)
        //     setcountSecond(countSecond =0)
        // }
        /////console.log(`${countHour}:${countMinute}:${countSecond}`, 'tiempo');
        ////setTimeShowed(`${countHour}:${countMinute}:${countSecond}`)
        return timeShowed// cronometro //currentOrders[i].dataEntry
    }

    const changeTime = setInterval(() => {// funcionnaaaaa cada segundo
        ///console.log('algo');
        getDate()
        timeHandle()

    }, 1000);

    // useEffect(() => {
    //     //setTimeShowed(timeShowed)
    //     console.log('change');
    //     //getDate()
    //     //timeHandle()
    // }, [changeTime])

    return (
        <div>
            <p> hora inicial {dataCurrentOrder.split(' ')[4]}</p>
            <p> hora actual {getDate().split(' ')[4]}</p>
            <p /* onClick={()=>timeHandle()} */> tiempo transcurrido {timeShowed}</p>
        </div>
    )
}
export default Timer