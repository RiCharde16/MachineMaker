import React, { useContext, useState } from 'react'
import Header from '../componentes/header'
import {Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth'
import { message } from'antd'

export default function Login(){
  const auth = useContext(AuthContext)
  const history = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e) => {
      const {name, value} = e.target;
      
      // Atualiza o estado dos valores no formulario
      setForm((preventData)=>({
          ...preventData,
          [name]: value,
        }));
    }

  async function onFinish (e) {
    e.preventDefault()
    try {
      if(form.email != '' && form.password != ''){
        const response = await auth.login(form.email, form.password)
        
        message.success("Usuario logado com sucesso !")
        
      } else {
        message.error("Todos os campos devem ser preenchidos")
      }
    } catch (error) {
      const erroMessage = error.response?.data?.erro || "Erro no login. Tente novamente"

      message.error(erroMessage)
    }
   
  }
  return(
      <main>
        <p><Link to="/" className='navigation'><span>Home</span></Link> / Login</p>
        <form className='form' onSubmit={(e)=>onFinish(e)}>
            <div className='group_input'>
              <label>Email</label>
              <input type="email" name='email' placeholder='example@gmail.com' value={form.email} onChange={handleLogin}></input>
            </div>
            <div className='group_input'>
              <label>Senha</label>
              <input type="password" name='password' placeholder='******' value={form.password} onChange={handleLogin}></input>
            </div>

            <button className='btn_submit' type='submit'>Entrar</button>
            <p>Esqueceu a senha?</p>
        </form>
      
      </main>
  )
}