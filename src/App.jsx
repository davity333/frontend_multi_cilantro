import './App.css'
import Grafica from './Components/Pages/Grafica';
import Login from './Components/Pages/Login';
import ActivarAgua from './Components/Pages/ActivarAgua';
import Home from './Components/Pages/Home';
import AddUsers from './Components/Pages/AddUsers';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPerfil from './Components/Pages/userPerfil';
import UserManual from './Components/Pages/UserManual';
import Recomendation from './Components/Pages/Recomendation';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/grafica' element={<Grafica />} />
          <Route path='/activar-agua' element={<ActivarAgua />} />
          <Route path='/addUsers' element={<AddUsers />} />
          <Route path='/perfil' element={<UserPerfil />} />
          <Route path='/userManual' element={<UserManual />} />
          <Route path='/recomendacion' element={<Recomendation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;