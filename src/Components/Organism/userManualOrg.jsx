import style from '../Organism/organism.module.css'
import plant from '/plant.png'
import manual from '/manual.png'
import { useNavigate } from 'react-router-dom';
function UserManualOrg() {

    const navigate = useNavigate();
    const menu = () => {
        navigate('/home');
    }
    return ( 
        <>
            <main className="relative">
                <p onClick={menu}
                className='text-2xl cursor-pointer text-[#3066e3] hover:text-[#80a6ff]' id={style.volver}>Volver</p>
                <section className="max-w-4xl mx-auto rounded-xl shadow-lg z-10 overflow-y-auto" id={style.scrollableSection}>
                    {/* Encabezado con degradado naranja a verde */}
                    <div className="bg-gradient-to-r from-orange-400 to-green-500 py-8 px-6">
                        <div className="flex justify-center items-center gap-5">
                            <img src={plant} alt="" className="w-12 h-14 rotate-12 filter drop-shadow-md" />
                            <h1 className="text-[#fff] text-5xl font-bold tracking-wide text-center">MANUAL DE USUARIO</h1>
                            <img src={manual} alt="" className="w-14 h-14 -rotate-12 filter drop-shadow-md" />
                        </div>
                        <p className="text-white text-center mt-3 text-xl">Configuración WiFi para ESP32</p>
                    </div>

                    {/* Contenido principal */}
                    <div className="p-8 ">
                        <section className="space-y-10">
                            {/* Paso 1 */}
                            <div className="border-l-4 border-orange-400 pl-6 py-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">1</span>
                                    <h2 className="text-green-600 font-bold text-2xl">ENCENDER EL DISPOSITIVO</h2>
                                </div>
                                <p className="text-gray-700 text-xl">
                                    Conecte la alimentación al dispositivo ESP32. Una vez encendido, el LED azul comenzará a parpadear indicando que está en modo de configuración.
                                </p>
                                <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200 flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
                                    <p className="text-green-800">LED azul parpadeante: Modo de configuración activo</p>
                                </div>
                            </div>

                            {/* Paso 2 */}
                            <div className="border-l-4 border-green-400 pl-6 py-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">2</span>
                                    <h2 className="text-orange-500 font-bold text-2xl">CONECTAR A WIFI</h2>
                                </div>
                                <p className="text-gray-700 text-xl">
                                    Desde su dispositivo móvil o computadora, busque las redes WiFi disponibles. Verá una red llamada <span className="font-semibold text-orange-600">"ESP32-Setup"</span>. Conéctese a esta red. La contraseña predeterminada es <span className="font-mono bg-gray-100 px-2 py-1 rounded text-green-700">12345678</span>.
                                </p>
                                <div className="mt-4 bg-orange-50 p-4 rounded-lg border border-orange-200">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-orange-800 font-medium">Si no encuentra la red, reinicie el dispositivo y espere 30 segundos.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Paso 3 */}
                            <div className="border-l-4 border-orange-400 pl-6 py-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">3</span>
                                    <h2 className="text-green-600 font-bold text-2xl">ACCEDER AL PORTAL DE CONFIGURACIÓN</h2>
                                </div>
                                <p className="text-gray-700 text-xl">
                                    Abra su navegador web y diríjase a la siguiente dirección:
                                </p>
                                <div className="bg-gray-800 text-green-400 font-mono text-xl p-4 rounded-lg mt-3 text-center">
                                    http://192.168.4.1
                                </div>
                                <p className="mt-3 text-gray-700 text-xl">
                                    Se abrirá el portal de configuración donde podrá establecer la conexión WiFi de su ESP32.
                                </p>
                            </div>

                            {/* Paso 4 - Configuración WiFi */}
                            <div className="border-l-4 border-green-400 pl-6 py-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">4</span>
                                    <h2 className="text-orange-500 font-bold text-2xl">CONFIGURAR SU RED WIFI</h2>
                                </div>
                                <p className="text-gray-700 text-xl mb-4">
                                    Introduzca los datos de su red WiFi en el formulario que aparecerá:
                                </p>
                                
                                {/* Formulario de ejemplo */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">Nombre de red (SSID):</label>
                                        <input type="text" placeholder="Introduzca el nombre de su red WiFi" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">Contraseña:</label>
                                        <input type="password" placeholder="Introduzca la contraseña" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    </div>
                                    <button className="bg-gradient-to-r from-orange-500 to-green-500 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                                        Conectar
                                    </button>
                                </div>
                            </div>

                            {/* Paso 5 - Verificación */}
                            <div className="border-l-4 border-orange-400 pl-6 py-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">5</span>
                                    <h2 className="text-green-600 font-bold text-2xl">VERIFICAR CONEXIÓN</h2>
                                </div>
                                <p className="text-gray-700 text-xl">
                                    Espere mientras el dispositivo se conecta a su red WiFi. Cuando la conexión sea exitosa:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                        <p className="text-green-800">LED verde fijo: Conexión establecida</p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <p className="text-orange-800">Mensaje de confirmación en pantalla</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Sección de solución de problemas */}
                        <div className="mt-10 bg-gradient-to-r from-orange-100 to-green-100 p-6 rounded-xl">
                            <h2 className="text-gray-800 font-bold text-xl mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                SOLUCIÓN DE PROBLEMAS
                            </h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Verifique que el nombre y contraseña de su red sean correctos</li>
                                <li>El ESP32 solo es compatible con redes WiFi de 2.4 GHz</li>
                                <li>Para reiniciar la configuración, mantenga presionado el botón de reset por 10 segundos</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default UserManualOrg;