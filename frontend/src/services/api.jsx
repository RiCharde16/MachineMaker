import { message } from 'antd';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
})

export async function LoginRequest(email, password) {
  try {
    const response = await api.post('/login', {
      email,
      password
    })

    return response
  } catch (error) {
    console.error("Erro na requisição de login", error)
    throw error;
    
  }
}

export const GetProdutos = async () => {
    try{
      const response = await api.get("/produtos")

      return response
    } catch (error) {
      console.error("Request failed", error)
    }

    return response
}

export const GetDadosUser = async (token) => {
  try {
    // console.log(token)
    const response = await api.get('/protegido', {
      headers: {
        Authorization: `${token}`
      }
    })

    return response
  } catch (error) {
    console.error("Request failed", error)
  }
}

export async function RegisterRequest(username, email, password) {
  try {
    const response = await api.post('/register', {
      username,
      email,
      password
    })

    if (response == null) {
      console.error(response.data.message)
    }

    return response
  } catch (error) {
    console.error("Request failed", error)
    throw error
  }
} 

export async function UpdateUserSimulacoes(token, simulacoes){
  try {
    const response = await api.put("/alterar-simulacoes", {
      simulacoes
    }, {
      headers: {
        Authorization: `${token}`
      }
    }) 

    if (response.data == null){
      console.error(response.data.message)
    }

    return response
  } catch (error) {
    console.error("request failed", error)
    throw error
  }
}

export async function PostAPIGemini(tipo, modelo, pecas) {
  try {
    const response = await api.post('/gemini-api', {
      tipo,
      modelo,
      pecas
    })

    if(response == null) {
      message.error(response.data.message)
    }

    return response.data
  } catch (error) {
    throw error
  }
} 