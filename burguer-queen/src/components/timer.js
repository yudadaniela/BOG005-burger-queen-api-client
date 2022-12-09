import React, { useState, useEffect } from "react";



const Timer = ({ dataCurrentOrder }) => {

    const [timeShowed, setTimeShowed] = useState(''); // ordenes actuales
    const [countSecond, setcountSecond] = useState(new Date().getSeconds());
    const [countMinute, setcountMinute] = useState(new Date().getMinutes());
    const [countHour, setcountHour] = useState(new Date().getHours());
    const [counter, setcounter] = useState(0);

    const initialDateHour = new Date(dataCurrentOrder).getHours()// volver a date hora de orden
    const initialDateMinute = new Date(dataCurrentOrder).getMinutes()// volver a date minutos de orden
    const initialDateSecond = new Date(dataCurrentOrder).getMinutes()// volver a date segundos de orden
   

    const timeHandle = () => {

    console.log('Min actual',countMinute,'min inicial', initialDateMinute);
        if(countMinute < initialDateMinute ){
            setcountHour(countHour - 1);   // ajusto hora actual
            setcountMinute(countMinute + 60); // ajusto minuto actual ///NO ESTÁ SUMANDO
        console.log('resta 1h:',countHour, 'suma:60m',countMinute,'seg cte', countSecond, 'if1, cambia horas-minutos');
        } else{
            console.log('está entrando al else1');
        }
        console.log('seg actual',countSecond,'seg inicial', initialDateSecond);
        if(countSecond < initialDateSecond ){
            setcountMinute(countMinute - 1);   // ajusto hora actual
            setcountSecond(countSecond + 60); // ajusto minuto actual ///NO ESTÁ SUMANDO
        console.log('hora cte',countHour,'resta 1m:', countMinute,'suma:60s', countSecond, 'if1, cambia horas-minutos');
        }
        else{
            console.log('está entrando al else2');
        }


        console.log('arregFINAL',countHour,countMinute,countSecond);
        setTimeShowed((`${countHour - initialDateHour} : ${ countMinute - initialDateMinute } : ${countSecond - initialDateSecond } `));

        return (`${countHour - initialDateHour} : ${ countMinute - initialDateMinute } : ${countSecond - initialDateSecond } `)

    }

    // const changeTime = setInterval(() => {// funcionnaaaaa cada segundo
    //     setcounter(counter + 1 )
    //     timeHandle()
    //     //setTimeShowed(timeHandle())
    // }, 1000/*1000*/);

    // useEffect(() => {
    //     if(countMinute < initialDateMinute ){
    //         setcountHour(countHour - 1);   // ajusto hora actual
    //         setcountMinute(countMinute + 60); // ajusto minuto actual ///NO ESTÁ SUMANDO
    //     console.log('resta 1h:',countHour, 'suma:60m',countMinute,'seg cte', countSecond, 'if1, cambia horas-minutos');
    //     }

    //     if(countSecond < initialDateSecond ){
    //         setcountMinute(countMinute - 1);   // ajusto hora actual
    //         setcountSecond(countSecond + 60); // ajusto minuto actual ///NO ESTÁ SUMANDO
    //     console.log('hora cte',countHour,'resta 1m:', countMinute,'suma:60s', countSecond, 'if1, cambia horas-minutos');
    //     }
   
    //     console.log('ENTRA AL UE');
    // }, [counter])

    return (
        <div>
            <p> hora inicial {`${initialDateHour} : ${initialDateMinute } : ${initialDateSecond } `}</p>
            <p> hora actual {`${new Date().getHours() } : ${ new Date().getMinutes() } : ${new Date().getSeconds() } `}</p>
            <p> hora hook {`${countHour } : ${ countMinute } : ${countSecond } `}</p>
            <p onClick={()=>timeHandle()}> tiempo transcurrido {timeShowed}</p>
        </div>
    )
}
export default Timer