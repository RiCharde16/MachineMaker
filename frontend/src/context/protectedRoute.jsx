import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./auth"; // Importe o contexto de autenticação

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />; // Redireciona para a página inicial se o usuário estiver logado
  }

  return children; // Renderiza a página se o usuário não estiver logado
};

export default ProtectedRoute;