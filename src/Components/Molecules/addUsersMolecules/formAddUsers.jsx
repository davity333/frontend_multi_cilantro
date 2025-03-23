function FormularioUsuario() {
    return (
      <>
        <div className="text-center mt-12">
            <p className="text-3xl font-bold">Registro de Usuarios</p>
            <p className="text-[2.3vh] pl-20 pr-20 mt-1">Registra los clientes que tendran acceso al sistem creandoles un nombre
                de usuario, correo electronico y contraseña, al igual que podras actualizar
                su contraseña o eliminarlo definitivamente
            </p>
        </div>
        <section className="flex flex-col gap-5 mt-7 items-center">
          <div className="space-y-6">
            <form className="space-y-6">
              <div className="space-y-4 flex item gap-16">
                <div>
                  <label htmlFor="usuario" className="block text-[2.2vh] font-medium text-gray-700">
                    Nombre del usuario
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    className="w-[50vh] px-4 py-2 mt-2 border border-gray-300 rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="contrasena" className="block text-[2.2vh] font-medium text-gray-700">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contrasena"
                    className="w-[50vh] px-4 py-2 mt-2 border border-gray-300 rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="correo" className="block text-[2.2vh] font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    className="w-[50vh] px-4 py-2 mt-2 border border-gray-300 rounded-md 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-center">
              <button
                type="button"
                className="w-[30vh] py-3 bg-blue-400 text-white font-semibold rounded-lg 
                           hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           cursor-pointer">
                Registrar usuario
              </button>
              </div>
            </form>
          </div>
  
          <div className="pl-20 pr-20 flex flex-col items-center justify-center">
            <div><h1 className="text-2xl font-medium text-[#605c5c]">Usuario agregados</h1></div>
            <table className="w-[90%] border-collapse table-fixed mt-2">
              <thead className="bg-[#a3ceb1] border-b border-gray-400">
                <tr>
                  <th className="px-6 py-2 border-r border-gray-300 w-1/3">Usuario</th>
                  <th className="px-6 py-2 border-r border-gray-300 w-1/3">Contraseña</th>
                  <th className="px-6 py-2 w-1/3">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="px-6 py-2 border-r border-gray-300">EjemploUsuario</td>
                  <td className="px-6 py-2 border-r border-gray-300">ejemplo@correo.com</td>
                  <td className="px-6 py-2 flex justify-center gap-2">
                    <button className="bg-[#c25d5d] text-white px-4 py-1 rounded-md hover:bg-[#db7979] cursor-pointer">
                      Eliminar
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-6 py-2 border-r border-gray-300">Usuario2</td>
                  <td className="px-6 py-2 border-r border-gray-300">usuario2@correo.com</td>
                  <td className="px-6 py-2 flex justify-center gap-2">
                    <button className="bg-[#c25d5d] text-white px-4 py-1 rounded-md hover:bg-[#db7979] cursor-pointer">
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }
  
  export default FormularioUsuario;
  