import react, { useContext } from 'react'
import '../CSS/navbars.css'
import {Link} from 'react-router-dom'
import AuthContext from '../context/auth'

export default function Header(){

  const { user, logout } = useContext(AuthContext)

  return(
    <div>
      <header>
        <h1>MachineMaker</h1>
          {!user ? <div className='btn_group'>
            <Link to="/login"><button className="btn_round">Entrar</button></Link>
            <Link to="/cadastro"><button className="btn_round">Cadastrar-se</button></Link>
          </div> :
          <div className='btn_group'> 
            <button className='btn_round' onClick={logout}>Logout</button>
            <div className='perfil_group'>
              <Link to="/perfil"><div className='perfil' title={user.nome}><i className='fa fa-user'/></div></Link>
              <h5>{user.nome}</h5>
            </div>
          </div>
          }
          
      </header>
      <ul className='menu'>
        <Link to="/pecas" className="navigation"><li className="item">Peças</li></Link>
        <Link to="/" className="navigation"><li className="item">Simulação</li></Link>
        <Link to="/ajuda" className="navigation"><li className="item">Ajuda</li></Link>
      </ul>
    </div>
  )
}