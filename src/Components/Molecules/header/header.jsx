import logo from '/logo.png';
import logout from '/logout.gif';
import userAdmin from '/userAdmin.png';
import user from '/user.png';
import menu from '/menu.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from "../../../Components/Molecules/text.module.css";

function Header() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const estadisticas = () => navigate('/grafica');
    const riego = () => navigate('/activar-agua');
    const home = () => navigate('/home');
    const userPerfil = () => navigate('/perfil');
    const logoutExit = () => navigate('/');

    useEffect(() => {
        const user = localStorage.getItem('user'); 
        if (user) {
            const parsedUser = JSON.parse(user);
            const userRole = parsedUser.role || ''; // Asegura que haya un valor
            console.log("Role:", userRole);
            setRole(userRole);
        } else {
            console.log("No se encontró el usuario en localStorage");
        }
    }, []);    

    const adminPerfil = () => navigate('/addUsers');
    const recomendacion = () => navigate('/recomendacion');

    return ( 
        <>
            <header className="bg-[#89bdb6] w-full h-auto flex items-center justify-between p-1 pr-10 pb-4">
                <div className='flex items-center ml-4'>
                    <img src={logo} alt="Logo" className='w-44 cursor-pointer' onClick={home} />
                </div>

                <div className='text-center'>
                    <div className='mt-3'>
                        <p className='text-4xl text-[#ffffff]' id={style.textJua}>AGRO-WATCH</p>
                        <p id={style.textDelgadiata} className='text-[3.3vh] -mt-2 text-[#5a6b63]'>CILANTROS</p>
                    </div>
                    <div className='flex items-center text-[2.6vh] gap-24 mt-2'>
                        <p onClick={estadisticas} className='cursor-pointer' id={style.textGruesa}>Estado de cilantros</p>
                        <p onClick={riego} id={style.textGruesa} className='cursor-pointer'>Riego automático</p>
                        <p onClick={recomendacion} id={style.textGruesa} className='cursor-pointer'>Recomendaciones</p>
                    </div>
                </div>

                <div className='flex gap-9 items-center'>
                    {role === 'superuser' ?
                    <img 
                    src={userAdmin} 
                    onClick={adminPerfil} 
                    alt="Usuario" 
                    className='w-10 cursor-pointer' 
                />    
                : 
                <img 
                src={user} 
                onClick={userPerfil} 
                alt="Usuario" 
                className='w-10 cursor-pointer' 
            />
                }
                    <img src={logout} alt="Logout" className='w-10 cursor-pointer' onClick={logoutExit} />
                </div>
            </header>
            <div className='h-[1vh] bg-[#6c958e]'></div>
        </>
    );
}

export default Header;
