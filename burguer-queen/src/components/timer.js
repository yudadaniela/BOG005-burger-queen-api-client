import React, { useState, useEffect } from "react";



const Timer = ({ dataCurrentOrder }) => {

    const [timeShowed, setTimeShowed] = useState(''); // ordenes actuales

    const [countSecond, setcountSecond] = useState(new Date().getSeconds());
    const [countMinute, setcountMinute] = useState(new Date().getMinutes());
    const [countHour, setcountHour] = useState(new Date().getHours());

    const [counter, setcounter] = useState(0);
   

    const initialDateHour = new Date(dataCurrentOrder).getHours()// volver a date hora de orden
    const initialDateMinute = new Date(dataCurrentOrder).getMinutes()// volver a date minutos de orden
    const initialDateSecond = new Date(dataCurrentOrder).getSeconds()// volver a date segundos de orden
   

    // const timeHandle = () => {

    // console.log('Min actual',countMinute,'min inicial', initialDateMinute);
    //     if(countMinute < initialDateMinute ){

    //         setcountMinute(countMinute + 60); // ajusto minuto actual ///NO ESTÁ SUMANDO
    //         setcountHour(countHour - 1);   // ajusto hora actual
           
    //     console.log('resta 1h:',countHour, 'suma:60m',countMinute,'seg cte', countSecond, 'if1, cambia horas-minutos');
    //     } else{
    //         console.log('está entrando al else1');
    //     }
    //     console.log('seg actual',countSecond,'seg inicial', initialDateSecond);
    //     if(countSecond < initialDateSecond ){
    //         setcountMinute(countMinute - 1);   // ajusto hora actual
    //         setcountSecond(countSecond + 60); // ajusto minuto actual ///NO ESTÁ SUMANDO
    //     console.log('hora cte',countHour,'resta 1m:', countMinute,'suma:60s', countSecond, 'if2, cambia minutos-SEG');
    //     }
    //     else{
    //         console.log('está entrando al else2');
    //     }

    //     console.log();
    //     console.log('arregFINAL',countHour,countMinute,countSecond); // NO SE ESTÁ ACTUZLIZANDO
    //     console.log('al restar',`${countHour - initialDateHour} : ${ countMinute - initialDateMinute } : ${countSecond - initialDateSecond } `);
    //     setTimeShowed((`${countHour - initialDateHour} : ${ countMinute - initialDateMinute } : ${countSecond - initialDateSecond } `));

    //     return (`${countHour - initialDateHour} : ${ countMinute - initialDateMinute } : ${countSecond - initialDateSecond } `)

    // }

    const timeHandle = () => {
    
        const currentDate = new Date()
        const orderDate = new Date(dataCurrentOrder)
        const resta = new Date(currentDate.getTime()- orderDate.getTime())
        setcountHour(resta.getHours())
        setcountMinute(resta.getMinutes())
        setcountSecond(resta.getSeconds())

    }


    const changeTime = setInterval(() => {// funcionnaaaaa cada segundo
        //setcounter(counter + 1 )
        timeHandle()
        //setTimeShowed(timeShowed) // genera errores de render
        //setTimeShowed((`${countHour - initialDateHour} : ${ countMinute - initialDateMinute } : ${countSecond - initialDateSecond } `))
    }, 1000/*1000*/);

  

    return (
        <div>
            <p> hora inicial {`${initialDateHour} : ${initialDateMinute } : ${initialDateSecond } `}</p>
            <p> hora actual {`${new Date().getHours() } : ${ new Date().getMinutes() } : ${new Date().getSeconds() } `}</p>
            <p> hora hook ajustada {`${countHour } : ${ countMinute } : ${countSecond } `}</p>
            <p onClick={()=>timeHandle()}> tiempo transcurrido {timeShowed}</p>
        </div>
    )
}
export default Timer