import Icons from "../Molecules/homeMolecules/icons";
import Introduction from "../Molecules/homeMolecules/introduction";
import { useState, useEffect } from "react";
import flecha from '/flecha.png'
import Photos from "../Molecules/homeMolecules/photos";
function HomeOrg() {
    const arriba = () => {
        window.scrollTo({
          top: 0, // Posición superior de la página
          behavior: 'smooth', // Movimiento suave
        });
      };
    return ( 
        <>
    <Introduction></Introduction>
    <Icons></Icons>
    <div className="fixed top-[87vh] w-full z-50 flex items-end justify-end">
        <img 
            src={flecha} 
            className="w-14 absolute cursor-pointer top-2 right-2" 
            alt="" 
            onClick={arriba} 
        />
    </div>
    <Photos></Photos>
</>

     );
}

export default HomeOrg;