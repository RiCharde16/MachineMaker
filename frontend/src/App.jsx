import Home from './Pages/home'
import {Routes, Route} from 'react-router-dom'
import Header from './componentes/header'
import Footer from './componentes/footer'
import { AuthProvider } from './context/auth';
import './App.css'

// paginas
import Login from './Pages/login'
import Cadastro from './Pages/cadastro'
import Ajuda from './Pages/ajuda'
import Pecas from './Pages/pecas'
import Perfil from './Pages/pagina_usuario'
import ProtectedRoute from './context/protectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<ProtectedRoute><Login/></ProtectedRoute>}/>
        <Route path='/cadastro' element={<ProtectedRoute><Cadastro/></ProtectedRoute>}/>
        <Route path='/ajuda' element={<Ajuda/>}/>
        <Route path='/pecas' element={<Pecas/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
      </Routes>
      <Footer/>
    </AuthProvider>
  )
}
