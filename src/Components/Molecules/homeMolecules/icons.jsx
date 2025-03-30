import gota from '/gota.png';
import grafia from '/grafica.png';
import idea from '/idea.png';
import abono from '/abono.png';
import font from '../homeMolecules/fonts.module.css'
import style from '../homeMolecules/home.module.css'
function Icons() {
    return ( 
        <>
            <div className='text-[#4385cb] flex mt-5 gap-10 justify-center items-center 
            flex-col bg-[#b8b6b67a] pb-10 pt-3' id={style.degradation}>
                <div className='flex flex-col text-center'>
                    <p className='text-[#2aa22a] text-4xl mt-5' id={font.jocketOne}>Funcionalidades</p>
                    <p className='text-[#958a45] text-4xl' id={font.jocketOne}>disponibles</p>
                </div>
                <div className='flex gap-32 justify-center'>
                    <div className='flex flex-col items-center'>
                    <img src={gota} alt="gota" className='w-24 opacity-70' id={style.iconZoom}/>
                    <p className='text-[3vh] mt-1' id={font.abel}>Riego automatico</p>
                    </div>

                    <div className='flex flex-col items-center'>
                    <img src={grafia} alt="grafia" className='w-24 opacity-70' id={style.iconZoom}/>
                    <p className='text-[3vh] mt-1' id={font.abel}>Ver datos estadisticamente</p>
                    </div>

                    <div className='flex flex-col items-center'>
                    <img src={idea} alt="idea" className='w-24 opacity-70' id={style.iconZoom}/>
                    <p className='text-[3vh] mt-1' id={font.abel}>Controlar el abono</p>
                    </div>

                    <div className='flex flex-col items-center'>
                    <img src={abono} alt="abono" className='w-24 opacity-70' id={style.iconZoom}/>
                    <p className='text-[3vh] mt-1' id={font.abel}>Recomendar acciones</p>
                    </div>
                </div>
            </div>

        </>
     );
}

export default Icons;