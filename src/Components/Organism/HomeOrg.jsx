import Icons from "../Molecules/homeMolecules/icons";
import Introduction from "../Molecules/homeMolecules/introduction";
import { useState, useEffect } from "react";
import flecha from '/flecha.png'
import wifi from '/wifi.png'
import Photos from "../Molecules/homeMolecules/photos";
import { useNavigate } from "react-router-dom";
function HomeOrg() {
    const navigate = useNavigate();

    const arriba = () => {
        window.scrollTo({
          top: 0, // Posición superior de la página
          behavior: 'smooth', // Movimiento suave
        });
      };

      const userManual = () => {
        navigate('/usermanual'); // Función que redirecciona a la ruta de userManual cuando se hace click en la flecha hacia arriba  // Ruta de userManual
    };

    return ( 
        <>
    <Introduction></Introduction>
    <Icons></Icons>
    <div className="fixed top-[87vh] w-full z-50 flex items-end justify-end">
        <img 
            src={wifi} 
            className="w-14 absolute cursor-pointer top-2 left-10" 
            alt="wifiIcon" 
            onClick={userManual}  // Función que redirecciona a la ruta de userManual cuando se hace click en el wifi icono  // Imagen de flecha hacia arriba
        />  {/* Imagen de wifi */}
        <img 
            src={flecha} 
            className="w-14 absolute cursor-pointer top-2 right-10" 
            alt="flechaIcon" 
            onClick={arriba} 
        />
    </div>
    <Photos></Photos>
</>

     );
}

export default HomeOrg;