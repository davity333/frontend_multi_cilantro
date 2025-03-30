import { useState, useEffect } from 'react';
import style from '../homeMolecules/home.module.css'
import font from '../homeMolecules/fonts.module.css'
import cilantro from '/cilantro4.png'
import espiral from '/espiral.png'
import heart from '/heart.gif'
function Introduction() {
    const words = ["Hidratados", "Nutridos", "Luminosos"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);
  
    useEffect(() => {
      const currentWord = words[currentWordIndex];
      let timeout;
  
      if (isDeleting) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => currentWord.slice(0, prev.length + 1)); 
        }, typingSpeed);
      }
  

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
  
      return () => clearTimeout(timeout); 
    }, [displayText, isDeleting, words, currentWordIndex, typingSpeed]);


    return ( 
        <>
        <div id={style.rain} className='absolute opacity-50 z-10 sepia-50'></div>
                <div className="w-24 h-24 bg-[#2ad404] rounded-full absolute -z-50" id={style.brillo}></div>
        <div id={style.cilantro}>
          <img src={cilantro} className='w-60 opacity-50 -translate-x-12 absolute -z-10' alt="" />
        <div className='ml-[15vh] mt-25'>
          <div className='flex items-center'>
            <p className='text-[8vh] font-bold'>Manten tus</p>
            <img src={heart} className='w-20 h-20 ml-4 opacity-50' alt="" />
          </div>
            <div className='flex items-center'>
              <p className='text-[8vh] font-bold text-[#54C168]'>cilantros:</p>
              <p className='text-[8vh] font-bold text-[#E3B664] ml-2'>{displayText}</p>
              <p id={style.linea} className='ml-1'>|</p>
              </div>
        </div>
          <div className='ml-28 mr-[90vh] text-[2.4vh]'>
            <p className='text-[2.5vh]'>AgroWath ayuda a los agricultores a gestionar sus cosechas con sensores 
            avanzados, monitoreo climático, optimización del riego y análisis de 
            datos en tiempo real, todo desde una plataforma intuitiva para maximizar 
            el rendimiento agrícola.
          </p>
          </div>

          <div className='flex items-center mt-2'>
            <div className='mt-6 ml-28 w-36 h-14 flex items-center justify-center' id={style.btnBorder}>
              <p id={font.jocketOne} className='text-[2.7vh] text-[#585454]'>Conocer</p>
            </div>
              <img src={espiral} alt="" className='h-16 ml-4'/>
          </div>
            </div>
          
        </>
     );
}

export default Introduction;