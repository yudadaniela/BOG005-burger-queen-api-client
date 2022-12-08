import React, { useState, useEffect } from "react";



const Timer = ({ dataCurrentOrder }) => {

    const [timeShowed, setTimeShowed] = useState(''); // ordenes actuales
    const [countSecond, setcountSecond] = useState(0);
    const [countMinute, setcountMinute] = useState(0);
    const [countHour, setcountHour] = useState(0);


    const getDate = () => new Date().toString(); // traer hora
    //const getDateHour = () => new Date().getHours; // traer hora

    const timeHandle = () => {

        const [h1, m1, s1] = dataCurrentOrder.split(' ')[4].split(':') // normalizar hora de pedido
        const [h2, m2, s2] = getDate().split(' ')[4].split(':')// normalizar hora actual



        if ( [h2, m2, s2][1]<[h1, m1, s1][1] ) {// minutos menores
            ///cuadre (reasigne el valor de la fecha inicial)
            
            setcountHour([h2, m2, s2][0] = parseInt([h2, m2, s2][0] - 1));   // ajusto hora actual
            setcountMinute([h2, m2, s2][1] = parseInt([h2, m2, s2][1] + 60)); // ajusto minuto actual
            //setcountSecond([h2, m2, s2][2]) // ajusto segundo actual

        } else {
            //reste normal los min
            setcountHour(parseInt([h2, m2, s2][0]))
            setcountMinute(parseInt([h2, m2, s2][1]))
        }

        if ([h2, m2, s2][2]<[h1, m1, s1][2] ) {// segundos menores
            ///cuadre (reasigne el valor de la fecha inicial)

            setcountMinute([h2, m2, s2][1] = parseInt([h2, m2, s2][1] - 1));   // ajusto MINUTO actual
            setcountSecond([h2, m2, s2][2] = parseInt([h2, m2, s2][2] + 60)); // ajusto segundo actual

        } else {

            setcountMinute(parseInt([h2, m2, s2][1]))
            setcountSecond(parseInt([h2, m2, s2][2]))
        }

        //console.log(`${countHour}:${countMinute}:${countSecond}`);
        /////restarrrrrrr hora actual-hora pedido

        let cronometro = `${parseInt(countHour - [h1, m1, s1][0])  } : ${ countMinute-parseInt([h1, m1, s1][1]) } : ${countSecond - parseInt([h1, m1, s1][2]) } `
        console.log(cronometro, ' es cronometro');
        //   // console.log(calculoInicial, 'inicial', calculoFinal,'final');
        // console.log(cronometro, 'diferencia en horas');
        //setTimeShowed(cronometro)
        //return `${countHour}:${countMinute}:${countSecond}`
        setTimeShowed(cronometro)
        return cronometro
        //return timeShowed// cronometro //currentOrders[i].dataEntry
    }

    const changeTime = setInterval(() => {// funcionnaaaaa cada segundo
        
        console.log('algo');
        //getDate()
        timeHandle()
        //console.log(`${countHour}:${countMinute}:${countSecond}`);

    }, 1000/*1000*/);

    // useEffect(() => {
    //     //setTimeShowed(timeShowed)
    //     console.log('change');
    //     //getDate()
    //     //timeHandle()
    // }, [])

    return (
        <div>
            <p> hora inicial {dataCurrentOrder.split(' ')[4]}</p>
            <p> hora actual {getDate().split(' ')[4]}</p>
            <p /* onClick={()=>timeHandle()} */> tiempo transcurrido {timeShowed}</p>
        </div>
    )
}
export default Timer