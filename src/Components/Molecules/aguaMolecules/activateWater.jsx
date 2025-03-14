import cilantro from '/cilantro.png'
import style from '../text.module.css'
import styles from '../loginMolecules/molecules.module.css'
function ActivateWater() {
    return ( 
        <>
        <div id={styles.cilandroMojado}>
        <section className='grid grid-cols-2 items-center justify-center'>
        <div className='flex flex-col mt-20 ml-32 mr-28'>
        <strong className='text-[5.6vh] mb-3 text-[#a8c1a9]'>Riego de plantas</strong>
        <p className='mt-2 text-[2.5vh] text-white'>En esta sección podrás activar el riego automático de tus cilantros, 
            ajustar la configuración según sus necesidades y asegurarte de que 
            reciban la cantidad adecuada de agua para un crecimiento óptimo.</p>
            <div className='space-x-7'>
            <button className="bg-[#71d7b5] p-4 rounded-xl w-[22vh] mt-6 hover:bg-[#68bb9f]
            duration-150 cursor-pointer" id={style.textGruesaNormal}>Activar riego</button>
            <button className='bg-[#c8d771] p-4 rounded-xl w-[25vh] hover:bg-[#b7c371] duration-150
            cursor-pointer'
            id={style.textGruesaNormal}>Configurar riego</button>
            </div>
        </div>

        <div className='flex justify-center items-center'>
            <img src={cilantro} alt="cilantro" className="w-[55vh] ml-4 opacity-80" />
        </div>
        </section>
        </div>
        </>
     );
}

export default ActivateWater;