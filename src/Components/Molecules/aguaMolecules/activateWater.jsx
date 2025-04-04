import cilantro from '/cilantro.png'
import style from '../text.module.css'
import styles from '../loginMolecules/molecules.module.css'
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'

function ActivateWater() {
    const [command, setCommand] = useState("");
    // const [dateToday, setDateToday] = useState(new Date());
    // const [timeWater, setTimeWater] = useState('');
    // const [horary, setHorary] = useState('');
    const [buttonFertilizer, setButtonFertilizer] = useState(false);
    const [user, setUser] = useState("sp32sk342");
    const [button, setButton] = useState(false);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState(null);
    
    // Water flow rate: 1000ml every 5 seconds
    const FLOW_RATE_ML_PER_SECOND = 200; // 1000ml / 5s = 200ml per second
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("No authentication token found");
            return;
        }

        const storedUserData = JSON.parse(localStorage.getItem('user'));
        if (!storedUserData) {
            setError("No user data found");
            return;
        }

        setUserData(storedUserData);
        console.log("User connected:", storedUserData.username);
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
        console.log("la hora es: ", fechaHoy);
        
        // Confirm the user has an adequate container for water flow
        const confirmWatering = await Swal.fire({
            title: '¿Está listo el recipiente?',
            text: 'El sistema dispensará agua a razón de 1000ml cada 5 segundos. Asegúrate de que tu recipiente tenga capacidad suficiente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar'
        });
        
        if (!confirmWatering.isConfirmed) {
            return;
        }
        
        // Estado manual activado
        setButton(true);
        const payload = {
            type: 'bombwater',
            command: "ON",   
            user: userData.username
        }

        try {
            const response = await fetch('http://127.0.0.1:4000/v1/message/messageFertilizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al activar el riego',
                icon: 'error'
            });
        }
    };
    
    const apagarBoton = async () => {
        setButton(false)
        const payload = {
            type: 'bombwater',
            command: "OFF",   
            user: userData.username
        }
        try {
            const response = await fetch('http://127.0.0.1:4000/v1/message/messageFertilizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al desactivar el riego',
                icon: 'error'
            });
        }
    }

    const activarFertilizante = async () => {
        // Confirm the user wants to apply fertilizer
        const confirmFertilizer = await Swal.fire({
            title: '¿Activar fertilizante?',
            text: 'Asegúrate de que el nivel de agua sea adecuado para aplicar el fertilizante. Un exceso podría dañar tus plantas.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, aplicar fertilizante',
            cancelButtonText: 'Cancelar'
        });
        
        if (!confirmFertilizer.isConfirmed) {
            return;
        }
        
        const payload = {
            type: 'fertilizer',
            command: "ON",   
            user: userData.username
        }
        
        try {
            const response = await fetch('http://52.23.135.169:4000/v1/message/messageFertilizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
              
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Notify user of successful activation
            Swal.fire({
                title: 'Fertilizante activado',
                text: 'El fertilizante se aplicará durante 5 segundos',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true
            });
    
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al activar el fertilizante',
                icon: 'error'
            });
            return;
        }
        
        setButtonFertilizer(true)
        setTimeout(() => {
            setButtonFertilizer(false)
        }, 5000);	
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
                
                {/* El sistema dispensará 1000ml cada 5 segundos */}
                <p className='mt-2 text-[2vh] text-[#ffe6a3]'>Nota: El sistema dispensa agua a razón de 1000ml cada 5 segundos. Asegúrate de tener un recipiente adecuado.</p>
                
                <div className='space-x-7'>
                    {button ? (
                        <button className="bg-[#d77171] p-4 rounded-xl w-[22vh] mt-6 hover:bg-[#d77171]
                        duration-150 cursor-pointer" id={style.textGruesaNormal} onClick={apagarBoton}>Apagar</button>
                    ):(
                        <button className="bg-[#71d7b5] p-4 rounded-xl w-[22vh] mt-6 hover:bg-[#68bb9f]
                        duration-150 cursor-pointer" id={style.textGruesaNormal} onClick={modoManual}>Modo manual</button>
                    )} 
                    {buttonFertilizer ? (
                        <button className='bg-[#d77171] p-4 rounded-xl w-[25vh] hover:bg-[#c56565] duration-150
                        cursor-pointer' id={style.textGruesaNormal}>Apagar fertilizante</button>
                    ) : (
                        <button className='bg-[#c8d771] p-4 rounded-xl w-[25vh] hover:bg-[#b7c371] duration-150
                        cursor-pointer' id={style.textGruesaNormal} onClick={activarFertilizante}>Activar fertilizante</button>
                    )}
                    <p className='text-[3vh] text-[#ffffff] font-bold mt-2'>{button ? 'Activado' : 'Desactivado'}</p>
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