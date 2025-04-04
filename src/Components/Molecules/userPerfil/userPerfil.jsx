import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from '../homeMolecules/home.module.css';

function UserPerfil() {
    const [nameUser, setNameUser] = useState(''); // Estado para el nombre del usuario
    const [emailUser, setEmailUser] = useState(''); // Estado para el email del usuario
    const navigate = useNavigate();

    // Obtén el nombre del usuario al montar el componente
    useEffect(() => {
        const user = localStorage.getItem('user'); // Obtén el user desde localStorage
        if (user) {
            const parsedUser = JSON.parse(user); // Parsea el JSON a un objeto
            const username = parsedUser.username; // Accede al campo username
            const email = parsedUser.email; // Accede al campo email
            console.log(username);
            setNameUser(username); // Actualiza el estado con el username
            setEmailUser(email); // Actualiza el estado con el email
        } else {
            console.log("No se encontró el usuario en localStorage");
        }
    }, []);

    return (
        <>
            <div id={style.cilantroUser}>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="bg-white shadow-xl rounded-2xl p-8 mb-56 w-96 text-center border-l-4 border-orange-300 relative overflow-hidden">
                        {/* Elementos decorativos */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-200 rounded-full opacity-20 translate-x-20 translate-y-20"></div>
                        <div className="absolute top-10 right-10 w-10 h-10 bg-orange-300 rounded-full opacity-30"></div>
                        
                        <div className="flex flex-col items-center relative z-10">
                            {/* Icono del usuario */}
                            <div className="p-2 w-28 h-28 flex rounded-full justify-center 
                                bg-orange-200 border-4 border-orange-300 mb-6 items-center shadow-md relative">
                                <p className="text-4xl font-bold text-orange-800">
                                    {nameUser.charAt(0).toUpperCase()} {/* Inicial del usuario */}
                                </p>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-green-100"></div>
                                </div>
                            </div>
    
                            <div className="space-y-6 items-center text-left w-full">
                                <div className="border-b-2 border-orange-100 pb-4">
                                    <div className="flex flex-col">
                                        <p className="font-bold tracking-tight text-[2.7vh] text-orange-800 flex items-center">
                                            NOMBRE DEL USUARIO
                                        </p>
                                        <p className="text-orange-600 text-[2.5vh]">{nameUser}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold tracking-tight text-[2.7vh] text-orange-800 flex items-center">
                                            CORREO DEL USUARIO
                                        </p>
                                        <p className="text-orange-600 text-[2.5vh]">{emailUser}</p>
                                    </div>
                                </div>
    
                                {/* Botón sin funcionalidad */}
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 flex items-center"
                                    >
                                        <span className="mr-2">Editar Perfil</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPerfil;
