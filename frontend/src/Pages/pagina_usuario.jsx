import React, {useContext, useEffect, useState} from 'react'
import '../App.css'
import AuthContext from '../context/auth'

export default function Pagina_usuario(){
    const { user } = useContext(AuthContext)
    const [expandedSections, setExpandedSections] = useState({});
    
    // Função para alternar o estado de dobrar/expandir
    const toggleSection = (section) => {
        setExpandedSections(prevState => ({
        ...prevState,
        [section]: !prevState[section]
        }));
    };

    useEffect(()=>{
        const simulacoes = user?.simulacoes 
        
        if (simulacoes) {
            simulacoes.forEach((simulacao) => {
              console.log(simulacao); // Exibe as simulações no console
            });
        }

    }, [user])

    const renderComponentos = (componentos) => {
        return componentos.map((item, idx) => (
          <div key={idx}>
            <p><strong>Modelo:</strong> {item.modelo}</p>
            <p><strong>Preço:</strong> {item.preco}</p>
            <p><strong>Loja:</strong> {item.loja}</p>
            <p><strong>Site:</strong> <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a></p>
          </div>
        ));
      };

    return(

        <main>
            <h2>Nome: {user?.nome}</h2>
            <h2>Email: {user?.email}</h2>
            <div className='container_simu'>
                {user?.simulacoes && user.simulacoes.length > 0 ? (
            user.simulacoes.map((simulacao, index) => (
            <div key={index} className="simulacao-container">
                <h3 onClick={() => toggleSection(index)} className="simulacao-title">
                Simulação {index + 1}
                </h3>

                {/* Iterando sobre todas as chaves de 'simulacao' */}
                {Object.keys(simulacao).map((componente, idx) => {
                if (Array.isArray(simulacao[componente]) && simulacao[componente].length > 0) {
                    return (
                    <div key={idx}>
                        <h4 onClick={() => toggleSection(`${index}-${componente}`)} className="componente-title">
                        {componente.replace(/_/g, ' ').toUpperCase()}
                        </h4>
                        <div
                        className={`componente-details ${expandedSections[`${index}-${componente}`] ? 'expanded' : ''}`}
                        >
                        {renderComponentos(simulacao[componente])}
                        </div>
                    </div>
                    );
                    }
                    return null;
                    })}
                </div>
                ))
            ) : (
                <p>Não há simulações disponíveis.</p>
            )}
            </div>
        </main>
    )
}