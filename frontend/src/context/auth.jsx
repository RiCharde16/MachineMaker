import React, { createContext, useState, useEffect} from "react";
import { GetDadosUser, LoginRequest, RegisterRequest } from '../services/api';
import { message } from "antd";

const AuthContext = createContext({})

export const AuthProvider =({children})=>{
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento inicial

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Chama o endpoint protegido para verificar o token
      GetDadosUser(token)
        .then((response) => {
          if(response){
            setUser(response.data.usuario); // Define os dados do usuário
          }
        })
        .catch((error) => {
          console.error("Token inválido ou expirado:", error);
          logout(); // Remove o token inválido
        })
        .finally(() => {
          setLoading(false); // Carregamento inicial completo
        });
    } else {
      setLoading(false); // Se não houver token, define como carregado
    }
    
  }, []);

  const login= async (email, password) => {
    try {
      const response = await LoginRequest(email, password)

      if(response.data){
        setUser(response.data);
        localStorage.setItem('token', response.data.token)

      }
      
    } catch (error) {
      const erroMessage = error.response?.data?.erro || "Erro no login. Tente novamente"

      message.error(erroMessage)
    }
  }

  const register = async (username, email, password) => {
    try {
        const response = await RegisterRequest(username, email, password);
        
        // console.log(response)
        if (response.data.token) {
          setUser(response.data);
          localStorage.setItem('token', response.data.token)
          return response
        }
    } catch (error) {
      // message.error(erroMessage)
      throw error
    }
  }

  const logout = ()=> {
    setUser(null);
    localStorage.removeItem('token');
  }
  return(
    <AuthContext.Provider value={{user, login, register, logout, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;