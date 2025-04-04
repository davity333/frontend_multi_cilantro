import cilantro from '/cilantro.png'
import style from '../text.module.css'
import styles from '../loginMolecules/molecules.module.css'
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
function ActivateWater() {
    const [command, setCommand] = useState("");
   // const [dateToday, setDateToday] = useState(new Date());
    //const [timeWater, setTimeWater] = useState('');
   // const [horary, setHorary] = useState('');
    const [user, setUser] = useState("sp32sk342");
    const [button, setButton] = useState(false);
    useEffect(() => {

    }, []);

    const modoManual = async () => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    
        const fechaHoy = new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    
        console.log("la fecha es:", formattedTime);
        console.log("la hora es: ",fechaHoy);
        // Estado manual activado
        setCommand('ON');
        setButton(true);
        const payload = {
            type: 'bombwater',
            command: command,   
            user: user  
        }
        try {
            const response = await fetch('http://127.0.0.1:4000/v1/message/messageFertilizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                
            });

            Swal.fire({
                title: "Modo manual activado",
                icon: "success",
                draggable: true
              });
             
              
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
        } catch (error) {
            console.error('Error:', error);
            alert("Ups hubo un error")
        }
    };
    

    const modoAuto = async () => {
        try {
            const response = await fetch('http://localhost:8080/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status,
                    date: dateToday,
                    time_water: timeWater,
                    horary: horary,
                    idUser: idUser
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const apagarBoton = () => {
        setButton(false)
    }
    return ( 
        <>
        <div id={styles.cilandroMojado}>
        <section className='grid grid-cols-2 items-center justify-center'>
        <div className='flex flex-col mt-20 ml-32 mr-28'>
        <strong className='text-[5.6vh] mb-3 text-[#c1e1c2]'>Riego de plantas</strong>
        <p className='mt-2 text-[2.5vh] text-white'>En esta sección podrás activar el riego manual y automático de tus cilantros, 
            ajustar la configuración según sus necesidades y asegurarte de que 
            reciban la cantidad adecuada de agua para un crecimiento óptimo.</p>
                <div className='space-x-7'>

                {button ? (
                    <button className="bg-[#d77171] p-4 rounded-xl w-[22vh] mt-6 hover:bg-[#d77171]
                    duration-150 cursor-pointer" id={style.textGruesaNormal} onClick={apagarBoton}>Apagar</button>
                ):(
                    <button className="bg-[#71d7b5] p-4 rounded-xl w-[22vh] mt-6 hover:bg-[#68bb9f]
                    duration-150 cursor-pointer" id={style.textGruesaNormal} onClick={modoManual}>Modo manual</button>
                )} 
                <button className='bg-[#c8d771] p-4 rounded-xl w-[25vh] hover:bg-[#b7c371] duration-150
                cursor-pointer'
                id={style.textGruesaNormal}>Modo automatico</button>
                    <p className='text-[3vh] text-[#ffffff] font-bold mt-2'>Activado</p>
                <div>
                </div>
                </div>
        </div>

        <div className='flex justify-center items-center'>
            <img src={cilantro} alt="cilantro" className="w-[55vh] ml-4 opacity-80" />
        </div>
        </section>
        </div>
        </>
     );
}

export default ActivateWater;