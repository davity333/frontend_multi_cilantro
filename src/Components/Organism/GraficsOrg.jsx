import GraficaEstruct from "../Molecules/graficaMolecules/graficaEstruct";
function GraficsOrganism() {
    return ( 
        <>
            <div className="flex justify-center mt-12 items-center flex-col gap-y-10">
                <div className="pl-24 pr-24 text-center">
                    <strong className="text-[3.9vh]">Estadisticas</strong>
            <p className="text-[2.6vh] mt-4">En esta sección podrás visualizar gráficos 
                en tiempo real de la <strong>temperatura</strong> y <strong>humedad</strong> de los cilantros, además 
                de acceder al historial completo de registros para un análisis 
                detallado y seguimiento de las condiciones de los cilindros a lo 
                largo del tiempo.</p>
                </div>
            <GraficaEstruct></GraficaEstruct>
            </div>
        </>
     );
}

export default GraficsOrganism;