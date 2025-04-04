import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from '../homeMolecules/home.module.css';

function UserPerfil() {
    const [nameUser, setNameUser] = useState(''); // Estado para el nombre del usuario
    const [emailUser, setEmailUser] = useState(''); // Estado para el email del usuario
    const [newEmail, setNewEmail] = useState(''); // Estado para el nuevo email
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensajes de éxito
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

    // Función para abrir el modal de cambio de correo
    const openEmailModal = () => {
        setNewEmail(emailUser); // Inicializa con el email actual
        setErrorMessage('');
        setSuccessMessage('');
        setIsEmailModalOpen(true);
    };

    // Función para cerrar el modal
    const closeEmailModal = () => {
        setIsEmailModalOpen(false);
    };

    // Función para actualizar el correo electrónico
    const updateEmail = async () => {
        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            setErrorMessage('Por favor, introduce un correo electrónico válido');
            return;
        }

        try {
            // Obtén el token y el ID del usuario del localStorage
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id; // Asumiendo que el ID está almacenado en el objeto user

            if (!token || !userId) {
                setErrorMessage('No se encontró la sesión del usuario. Por favor, inicia sesión nuevamente.');
                return;
            }

            const response = await fetch(`http://127.0.0.1:8080/v1/users/allUsers/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    gmail: newEmail // Nombre del campo según tu estructura UserToUpdate
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el correo electrónico');
            }

            const data = await response.json();
            
            // Actualiza el email en el estado y en localStorage
            setEmailUser(newEmail);
            const updatedUser = { ...user, email: newEmail };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            setSuccessMessage('¡Correo electrónico actualizado con éxito!');
            
            // Cierra el modal después de un breve tiempo
            setTimeout(() => {
                closeEmailModal();
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message || 'Ocurrió un error al actualizar el correo electrónico');
        }
    };

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
    
                                {/* Botones para editar perfil */}
                                <div className="flex flex-col gap-3 justify-center mt-4">
                                    <button
                                        onClick={openEmailModal}
                                        className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 flex items-center justify-center"
                                    >
                                        <span>Cambiar Correo</span>
                                    </button>
                                    <button
                                        className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 flex items-center justify-center"
                                    >
                                        <span>Editar Perfil</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para cambiar correo electrónico */}
            {isEmailModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-2xl relative">
                        {/* Elementos decorativos del modal */}
                        <div className="absolute top-0 left-0 w-24 h-24 bg-orange-200 rounded-full opacity-20 -translate-x-12 -translate-y-12"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-200 rounded-full opacity-20 translate-x-12 translate-y-12"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-orange-800 mb-4">Actualizar Correo Electrónico</h2>
                            
                            {errorMessage && (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                            
                            {successMessage && (
                                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 rounded">
                                    <p>{successMessage}</p>
                                </div>
                            )}
                            
                            <div className="mb-4">
                                <label className="block text-orange-800 text-sm font-bold mb-2" htmlFor="newEmail">
                                    Nuevo correo electrónico:
                                </label>
                                <input
                                    type="email"
                                    id="newEmail"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-300"
                                    placeholder="Ingresa tu nuevo correo"
                                />
                            </div>
                            
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={closeEmailModal}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={updateEmail}
                                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserPerfil;