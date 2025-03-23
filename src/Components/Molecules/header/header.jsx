import logo from '/logo.png'
import logout from '/logout.gif';
import { useNavigate } from 'react-router-dom';
import style from "../../../Components/Molecules/text.module.css"
function Header() {
    const navigate = useNavigate();

    const estadisticas = () => {
        navigate('/grafica');
    }

    const riego = () => {
        navigate('/activar-agua');
    }

    const home = () => {
        navigate('/home');
    }
    return ( 
        <>
            <header className="bg-[#89bdb6] w-full h-auto flex items-center justify-between p-1 pl-10 pr-10 pb-4">
                <div className='flex items-center'>
                <img src={logo} alt=""  className='w-28 cursor-pointer' onClick={home}/>
                </div>

                <div className='text-center'>
                    <div className='mt-3'>
                    <p className='text-4xl text-[#ffffff]' id={style.textJua}>AGRO-WATCH</p>
                    <p id={style.textDelgadiata} className='text-[3.3vh] -mt-2 text-[#5a6b63]'>CILANTROS</p>
                    </div>
                    <div className='flex items-center text-[2.6vh] gap-24 mt-2'>
                        <p onClick={estadisticas} className='cursor-pointer' id={style.textGruesa}>Estado de cilantros</p>
                        <p onClick={riego} id={style.textGruesa} className='cursor-pointer'>Riego automatico</p>
                        <p id={style.textGruesa} className='cursor-pointer'>Recomendaciones</p>
                    </div>
                </div>
                <div>
                    <img src={logout} alt="" className='w-10'/>
                </div>
            </header>
            <div className='h-[1vh] bg-[#6c958e]'></div>
        </>
     );
}

export default Header;