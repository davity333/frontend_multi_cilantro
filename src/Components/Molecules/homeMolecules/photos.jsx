import sensor from '/cilantroSensor.png'
import grafica from '/cilantroGrafica.jpg'
import tierra from '/tierra.jpg'
import style from '../homeMolecules/home.module.css'
function Photos() {
    return ( 
        <>
            <div className='flex justify-center gap-10 items-center opacity-40'>
                <hr className='h-[0.1] w-[80vh]'/>
                <div className='w-4 h-4 rounded-full bg-black'></div>
                <hr className='h-[0.1] w-[80vh]'/>
            </div>

            <section className='flex flex-col md:flex-row ml-4 md:ml-28 gap-8 mt-10'>
                <img src={sensor} alt="Cilantro Sensor" className='w-full md:w-[75vh] rounded-lg shadow-md'/>
                <div className='mt-5 max-w-xl'> 
                    <h2 className='text-4xl font-bold mb-4 text-[#6a8d9a] tracking-wide relative'>
                        <span className="relative">
                            Riego Automático
                            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#6a8d9a] opacity-60 rounded-full"></span>
                        </span>
                    </h2>
                    <div className='mt-6'>
                        <p className='text-lg leading-relaxed text-gray-700 font-light'>
                            En el apartado de <span className="font-medium italic text-[#6a8d9a]">"Riego Automático"</span>, el usuario podrá activar el 
                            riego en dos modos: <span className="font-medium">manual</span> y <span className="font-medium">automático</span>; en modo manual, ajustará 
                            el tiempo de riego según su preferencia, mientras que en modo 
                            automático, el sistema permanecerá activo hasta que el usuario decida 
                            apagarlo.
                        </p>
                    </div>
                    
                    {/* Botón decorativo "Explorar" */}
                    <div className="mt-8">
                        <button className="relative overflow-hidden group px-8 py-3 
                        bg-gradient-to-r from-[#6a8d9a] to-[#89b0be] 
                        text-white font-medium rounded-lg shadow-md transform 
                        transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                            {/* Decoración - burbujas de agua */}
                            <span className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full opacity-60 group-hover:animate-ping"></span>
                            <span className="absolute top-3 right-6 w-1 h-1 bg-white rounded-full opacity-60 group-hover:animate-ping delay-100"></span>
                            <span className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-white rounded-full opacity-60 group-hover:animate-ping delay-200"></span>
                            
                            {/* Texto del botón */}
                            <span className="relative font-semibold text-lg tracking-wider">Explorar</span>
                            
                            {/* Ícono de flecha */}
                            <svg className="inline-block ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </section>


            <section className='flex flex-col md:flex-row ml-4 md:ml-28 gap-8 mt-16'>
                <div className='mt-5 max-w-xl'> 
                    <h2 className='text-4xl font-bold mb-4 text-[#acb55d] tracking-wide relative'>
                        <span className="relative">
                            Graficas
                            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#949a6a] opacity-60 rounded-full"></span>
                        </span>
                    </h2>
                    <div className='mt-6'>
                        <p className='text-lg leading-relaxed text-gray-700 font-light'>
                            En el apartado de <span className="font-medium italic text-[#6a8d9a]">"Riego Automático"</span>, el usuario podrá activar el 
                            riego en dos modos: <span className="font-medium">manual</span> y <span className="font-medium">automático</span>; en modo manual, ajustará 
                            el tiempo de riego según su preferencia, mientras que en modo 
                            automático, el sistema permanecerá activo hasta que el usuario decida 
                            apagarlo.
                        </p>
                    </div>
                    
                    {/* Botón decorativo "Explorar" */}
                    <div className="mt-8">
                        <button className="relative overflow-hidden group px-8 py-3 
                        bg-gradient-to-r from-[#959a6a] to-[#adbe89] 
                        text-white font-medium rounded-lg shadow-md transform 
                        transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                            {/* Decoración - burbujas de agua */}
                            <span className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full opacity-60 group-hover:animate-ping"></span>
                            <span className="absolute top-3 right-6 w-1 h-1 bg-white rounded-full opacity-60 group-hover:animate-ping delay-100"></span>
                            <span className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-white rounded-full opacity-60 group-hover:animate-ping delay-200"></span>
                            
                            {/* Texto del botón */}
                            <span className="relative font-semibold text-lg tracking-wider">Explorar</span>
                            
                            {/* Ícono de flecha */}
                            <svg className="inline-block ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <img src={grafica} alt="Cilantro Sensor" className='w-full md:w-[75vh] rounded-lg shadow-md'/>

            </section>
            <div className='flex flex-col justify-center items-center mt-24 pb-20 text-3xl '>
            <p id={style.gracias} className='text-5xl text-[#26946b]'>Gracias por usar AgroWatch</p>
            </div>
            <img src={tierra} className='w-full h-[70vh]' alt="" />
        </>
    );
}

export default Photos;