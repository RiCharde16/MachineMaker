import React, { useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import AuthContext from '../context/auth'
import { message } from 'antd'


export default function Cadastro(){
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    senhaRepetida: ''
  })

  const handleCadastro = async (e) => {
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
      if(form.email != '' && form.senha != '' && form.nome != '' && form.senhaRepetida != ''){
        if (form.senha == form.senhaRepetida) {
          const response = await auth.register(form.nome, form.email, form.senha)
            
          message.success("Usuario cadastrado com sucesso !")
          if(response){
            navigate('/')
          } 
        } else {
          message.error("Senhas não coincidem !")
        } 
      } else {
        message.error("Todos os campos são obrigatorios")
      }
    } catch (error) {
      const erroMessage = error.response?.data?.erro || "Erro no login. Tente novamente"

      message.error(erroMessage)
    }
  }
  
  return(
      <main>
        <p><Link to="/" className='navigation'><span>Home</span></Link> / Cadastro</p>
        <form className='form' onSubmit={(e)=>onFinish(e)}>
          <div className='group_input'>
            <label>Nome do usuário</label>
            <input type="text" placeholder='Joao Soares' name='nome' value={form.nome} onChange={handleCadastro}></input>
          </div>
          <div className='group_input'>
            <label>Email</label>
            <input type="email" placeholder='exemplo@gmail.com' name='email' value={form.email} onChange={handleCadastro}></input>
          </div>
          <div className='group_input'>
            <label>Senha</label>
            <input type="password" placeholder='*******' name='senha' value={form.senha} onChange={handleCadastro}></input>
          </div>
          <div className='group_input'>
            <label>Repita Senha</label>
            <input type="password" placeholder='*******' name='senhaRepetida' value={form.senhaRepetida} onChange={handleCadastro}></input>
          </div>
  
          <button className='btn_submit' type='submit'>Registrar</button>
        </form>
      </main>
  )
}