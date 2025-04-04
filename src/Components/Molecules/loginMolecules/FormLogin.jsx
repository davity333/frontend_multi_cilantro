import style from '../../Molecules/loginMolecules/molecules.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ForgetPass from '../userPerfil/userPerfil';
import loading from '/loading.png'
function Login() {
    const [formData, setFormData] = useState({ user: "", password: "" });
    const [isError, setIsError] = useState(false);
    const [isGood, setIsGood] = useState(false); 
    const navigate = useNavigate();
    const [modalForget, setModalForget] = useState(false)

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

    const forget = () =>{
        setModalForget(true)
    }

    const login = async (e) => {
    e.preventDefault();
    const loginData = {
      username: formData.user,
      password: formData.password,
    };
    console.log(loginData);

    try {
      
      const response = await fetch("http://localhost:8080/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      if (response.ok){
        navigate("/home");
        const { username, role, id } = data.user; // role ahora se extrae correctamente desde user
        const token = response.headers.get("Authorization");
    
        console.log("Token recibido:", token);
        localStorage.setItem("token", token.replace("Bearer ", ""));
        localStorage.setItem("user", JSON.stringify({ username, id, role }));
      
      }
      if (!response.ok) {
        alert("Error al iniciar sesión");
        throw new Error(data.error || "Error al iniciar sesión");
      }

      if (!data || !data.user || !data.user.username || !data.user.id || !data.user.role) {
        throw new Error("Respuesta del servidor incompleta");
      }
      if(data.user.role === "superuser"){
        navigate("/addUsers");
      }
  
      // Extraemos los valores correctamente


      setIsGood(true);
      setIsError(false);
      setTimeout(() => {
      navigate("/home");
      }, 2000);
    } catch (err) {
      console.error("Error capturado:", err.message);
      setIsError(true); 
      setIsGood(false); 
    }
  };

    return ( 
        <>
            <form action="" id={style.form_main} className=''>
                <p id={style.heading} className=''>Iniciar sesión</p>
                {isError && (
              <p className="text-red-500 text-center absolute mb-32 z-50">
                Datos incorrectos.
              </p>
            )}
            {isGood && (
              <div className=''>
                <p className="text-green-500 text-center">
                Conectado
                </p>
              </div>
            )}
                <div className='mt-3'>
                <div id={style.inputContainer} className=''>
                    <svg id={style.inputIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                    </svg>
                    <input type="text" id={style.inputField} placeholder="Username" value={formData.user} onChange={onChange} name='user'/>
                </div>
                
                <div id={style.inputContainer}>
                    <svg id={style.inputIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input type="password" id={style.inputField} placeholder="Password" value={formData.password} onChange={onChange} name='password'/>
                </div>
                        
                <button  id={style.button} onClick={login}>Submit</button>
                <p id={style.forgotLink} onClick={forget} className='cursor-pointer border-2'>Forgot your password?</p>
                </div>
            </form>
        </>
    );
}

export default Login;
