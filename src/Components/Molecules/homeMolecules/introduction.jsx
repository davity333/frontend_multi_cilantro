import { useState, useEffect } from 'react';
import cilantro from '/macetaCilantro.png'
import style from '../homeMolecules/home.module.css'
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
        <div>
        <div>
            <p className='text-2xl'>Manten tus</p>
            <p className='text-3xl'>cilantros: {displayText}</p>
        </div>
            <img src={cilantro} id={style.maceta} alt="" />
            </div>
        </>
     );
}

export default Introduction;