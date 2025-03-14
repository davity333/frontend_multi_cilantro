import './App.css'
import Grafica from './Components/Pages/Grafica';
import Login from './Components/Pages/Login';
import ActivarAgua from './Components/Pages/ActivarAgua';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/grafica' element={<Grafica />} />
          <Route path='/activar-agua' element={<ActivarAgua />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;