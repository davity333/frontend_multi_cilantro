import Login from "../Molecules/loginMolecules/FormLogin";
import curve from '/curveGreen.jpg'
import cilantro from '/cilandro1.gif'
import cilantro2 from '/cilandro2.gif'
import cilandro3 from '/cilandro3.gif'
import style from '../Organism/organism.module.css'
function LoginOrg() {
    return ( 
        <>
        <div className="flex justify-center flex-col items-center min-h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute mb-[70vh]" viewBox="0 0 1440 320"><path fill="#3fa9893e" fill-opacity="1" d="M0,224L48,224C96,224,192,224,288,192C384,160,480,96,576,112C672,128,768,224,864,261.3C960,299,1056,277,1152,250.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <Login />
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-[54vh] absolute" viewBox="0 0 1440 320"><path fill="#3fa9893e" fill-opacity="1" d="M0,192L60,202.7C120,213,240,235,360,234.7C480,235,600,213,720,186.7C840,160,960,128,1080,133.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <img src={cilantro} alt="" className="absolute w-44 opacity-35" id={style.cilantro1}/>
            <img src={cilantro2} alt="" className="absolute w-40 opacity-35" id={style.cilantro2}/>
            <img src={cilandro3} alt="" className="absolute w-32 opacity-40" id={style.cilantro3}/>
        </div>
        </>
     );
}

export default LoginOrg;