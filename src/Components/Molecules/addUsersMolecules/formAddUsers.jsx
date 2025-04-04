import { useState, useEffect } from "react";

function FormAddUser() {
  const [user, setUser] = useState({ username: "", password: "", gmail: "", role: "" }); // Incluye el rol
  const [usuarios, setUsuarios] = useState([]);

  // Fetch para obtener usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No hay token disponible");
          return;
        }

        const response = await fetch("http://localhost:8080/v1/users/superuser/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();
        setUsuarios(data.data);
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };
    fetchUsers();
  }, []);

  // Maneja los cambios en los inputs y el select
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No hay token disponible");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/v1/users/superuser/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user), // Envía el objeto `user` completo, incluido `role`
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      const newUser = await response.json();
      setUsuarios([...usuarios, newUser]); // Agrega el nuevo usuario a la tabla
      setUser({ username: "", password: "", gmail: "", role: "" }); // Limpia el formulario
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <>
      <div className="text-center mt-12">
        <p className="text-3xl font-bold">Registro de Usuarios</p>
        <p className="text-[2.3vh] pl-20 pr-20 mt-1">
          Registra los clientes que tendrán acceso al sistema creando un nombre
          de usuario, correo electrónico y contraseña, además de poder actualizar
          su contraseña o eliminarlo definitivamente.
        </p>
      </div>
      <section className="flex flex-col gap-5 mt-4 items-center">
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 flex gap-16">
              {/* Campo para el nombre de usuario */}
              <div>
                <label htmlFor="username" className="block text-[2.2vh] font-medium text-gray-700">
                  Nombre del usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-[40vh] px-4 py-2 mt-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* Campo para la contraseña */}
              <div>
                <label htmlFor="password" className="block text-[2.2vh] font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-[40vh] px-4 py-2 mt-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* Campo para el correo electrónico */}
              <div>
                <label htmlFor="gmail" className="block text-[2.2vh] font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  value={user.gmail}
                  onChange={handleChange}
                  className="w-[40vh] px-4 py-2 mt-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* Campo para el rol */}
              <div className="flex flex-col">
                <label htmlFor="role" className="block text-[2.2vh] font-medium text-gray-700">
                  Rol
                </label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="mt-2 h-9 w-[30vh] border-[0.1vh] opacity-60"
                  required
                >
                  <option value="">Seleccione un rol</option>
                  <option value="normaluser">Usuario</option>
                  <option value="premiumuser">Usuario premium</option>
                  <option value="superuser">Administrador</option>
                </select>
              </div>
            </div>
            {/* Botón para registrar */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[30vh] py-3 bg-blue-400 text-white font-semibold rounded-lg 
                         hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         cursor-pointer"
              >
                Registrar usuario
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de usuarios agregados */}
        <div className="pl-20 pr-20 flex flex-col items-center justify-center">
  <div>
    <h1 className="text-2xl font-medium text-[#605c5c]">Usuarios agregados</h1>
  </div>
  {/* Contenedor scrollable */}
  <div className="overflow-auto h-[40vh] w-[90%]"> {/* Ajusta la altura y el ancho para el scroll */}
    <table className="w-full border-collapse table-fixed mt-2">
      <thead className="bg-[#a3ceb1] border-b border-gray-400">
        <tr>
          <th className="px-6 py-2 border-r border-gray-300 w-1/3">Usuario</th>
          <th className="px-6 py-2 border-r border-gray-300 w-1/3">Gmail</th>
          <th className="px-6 py-2 w-1/3">Acción</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.idUser} className="border-b border-gray-300">
            <td className="px-6 py-2 border-r border-gray-300">{usuario.username}</td>
            <td className="px-6 py-2 border-r border-gray-300">{usuario.gmail}</td>
            <td className="px-6 py-2 flex justify-center gap-2">
              <button
                className="bg-[#c25d5d] text-white px-4 py-1 rounded-md hover:bg-[#db7979] cursor-pointer"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      </section>
    </>
  );
}
export default FormAddUser;
