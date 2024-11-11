import React, {useContext, useEffect, useState} from 'react'
import '../CSS/navbars.css'
import '../App.css'
import Pecas_montagem from '../componentes/pecas_montagem' 
import { GetProdutos, PostAPIGemini, UpdateUserSimulacoes } from '../services/api'
import AuthContext from '../context/auth'
import { message } from 'antd'


export default function Home() {
  const [pecas, setPecas] = useState({})
  const [total, setTotal] = useState(0.00)
  const [montagem, setMontagem] = useState({
    'processador': [],
    'cooler_processador': [],
    'armazenamento': [],
    'memoria': [],
    'placa_mae': [],
    'placa_video': [],
    'gabinete': [],
    'fonte': []
  })
  const [texto, setTexto] = useState("")
  const { user } = useContext(AuthContext)
  
  useEffect(()=>{
    async function fetchPecas(){
      const response = await GetProdutos()
      const novasPecas = {
        'processador': [...response.data][0]['Processador'],
        'cooler_processador': [...response.data][0]['Cooler do processador'],
        'armazenamento': [...response.data][0]['Armazenamento'],
        'memoria': [...response.data][0]['Memória'],
        'placa_mae': [...response.data][0]['Placa mãe'],
        'placa_video': [...response.data][0]['Placa de vídeo'],
        'gabinete': [...response.data][0]['Gabinete'],
        'fonte': [...response.data][0]['Fonte']
      }
      setPecas(novasPecas)
      // console.log(montagem)
    }
    fetchPecas()
  }, []);

  useEffect(()=>{ 
      const novoTotal = Object.values(montagem).reduce((acc, item) => {
        // Verifica se o item é um array e se tem pelo menos um elemento com o campo de preço
        if (Array.isArray(item) && item.length > 0 && item[0].preco) {
            return acc + parseFloat(item[0].preco)
        }
        return acc
      }, 0)

      // Atualiza o estado total com o novo total
      setTotal(novoTotal)
    // console.log(montagem)
  }, [montagem])

  const handleSelect = async (nomePeca, novoModelo) => {
    setMontagem(prev => ({
      ...prev,
      [nomePeca]: novoModelo
    }))

    const resultado = Object.entries(montagem).flatMap(([chave, valor]) => {
      if (valor && valor.length > 0) {
        return valor.map(peca => `${chave}: ${peca.modelo}`);
      }
      return []; // Retorna um array vazio se não houver peças
    });
    
    // console.log(resultado)

    try {  

      if(resultado.length > 0){
        const response = await PostAPIGemini(nomePeca, novoModelo[0].modelo, resultado)
    
        if(response){
          setTexto(response)
        }
      }

    } catch (error) {
      console.error(error)
    }
  }

  const salvarSimulacao = async () =>{
    const token = localStorage.getItem('token')
    const todasPreenchdias = Object.values(montagem).every(pecas => pecas.length > 0)
    
    if(todasPreenchdias){
      try{
        const resultado = await UpdateUserSimulacoes(token, montagem)
        
        if(resultado){
          message.success("Simulação de montagem salva!")
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      message.error("Por favor, preencha todas as pecas")
    }
  }
  return(
      <main>
      <p><span>Home</span> / Simulação</p>
        <div className='container'>
          <h3>Montagem</h3>
          <table>
            <thead>
              <tr>
                <th>Peça</th>
                <th>Modelo</th>
                <th>Preço</th>
                <th>Loja</th>
              </tr>
            </thead>
            <tbody>
              {pecas.processador && (
                <Pecas_montagem peca="Processador"
                  modelo={pecas.processador}
                  onChangeModelo={(novoModelo)=>{ handleSelect("processador", [novoModelo])}}
                  />
              )}

              {pecas.cooler_processador && (
                <Pecas_montagem 
                  peca="Cooler do Processador"
                  modelo={pecas.cooler_processador}
                  onChangeModelo={(novoModelo) => handleSelect("cooler_processador", [novoModelo])}
                />
              )}

              {pecas.placa_mae && (
                  <Pecas_montagem 
                    peca="Placa-Mãe"
                    modelo={pecas.placa_mae}
                    onChangeModelo={(novoModelo) => handleSelect("placa_mae", [novoModelo])}
                  />
              )}

              {pecas.memoria && (
                  <Pecas_montagem 
                    peca="Memória"
                    modelo={pecas.memoria}
                    onChangeModelo={(novoModelo) => handleSelect("memoria", [novoModelo])}
                  />
              )}

              {pecas.armazenamento && (
                  <Pecas_montagem 
                    peca="Armazenamento"
                    modelo={pecas.armazenamento}
                    onChangeModelo={(novoModelo) => handleSelect("armazenamento", [novoModelo])}
                  />
              )}

              {pecas.fonte && (
                  <Pecas_montagem 
                    peca="Fonte"
                    modelo={pecas.fonte}
                    onChangeModelo={(novoModelo) => handleSelect("fonte", [novoModelo])}
                  />
              )}

              {pecas.placa_video && (
                  <Pecas_montagem 
                    peca="Placa de vídeo"
                    modelo={pecas.placa_video}
                    onChangeModelo={(novoModelo) => handleSelect("placa_video", [novoModelo])}
                  />
              )}

              {pecas.gabinete && (
                  <Pecas_montagem 
                    peca="Gabinete"
                    modelo={pecas.gabinete}
                    onChangeModelo={(novoModelo) => handleSelect("gabinete", [novoModelo])}
                  />
              )}
            </tbody>
          </table>
          <div className='block'>
            <h3>Total: R$ {total.toFixed(2).replace(".",",") || "00,00"}</h3>
            {user? <button onClick={salvarSimulacao}>Salvar</button>: <p></p> }
          </div>
          <br/>
          <div dangerouslySetInnerHTML={{ __html: texto }}></div>
        </div>
      </main>
  )
}