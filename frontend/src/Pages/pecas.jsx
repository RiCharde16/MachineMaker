  import React, {useState, useEffect} from 'react'
  import '../CSS/pecas_style.css'
  import {Link} from 'react-router-dom'
  import Card from '../componentes/card'
  import { GetProdutos } from '../services/api'


export default function Pecas(){
    const style = {
      cursor: "pointer"
    }

    const [pecas, setPecas] = useState({})
    const [searchQuery, setSearchQuery] = useState("") // Estado que armazena o valor da pesquisa
    const [filteredPecas, setFilteredPecas] = useState({})

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
        setFilteredPecas(novasPecas)
        // console.log(montagem)
      }
      fetchPecas()
    }, []);

  // Função de filtragem
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredPecas(pecas); // Se o campo de pesquisa estiver vazio, exibe todas as peças
    } else {
      setFilteredPecas(
        Object.keys(pecas).reduce((acc, key) => {
          const filteredItems = Array.isArray(pecas[key]) ? pecas[key].filter(item =>
            item.modelo && item.modelo.toLowerCase().includes(searchQuery.toLowerCase())
          ) : [];

          if (filteredItems.length > 0) {
            acc[key] = filteredItems; // Se houverem peças filtradas, as adiciona no resultado
          }
          return acc;
        }, {})
      );
    }
  };

    // Função para detectar pressionamento de Enter
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch(); // Chama a função de pesquisa ao pressionar Enter
      }
    }

    // Atualiza o valor de pesquisa
    const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value)
    }

    return(
      <main>
        <p><Link to="/" className="navigation"><span>Home</span></Link> / Peças</p>
        <div className="container">

            <div id="pesquisa">
              <input 
                type="text" 
                placeholder='digite um nome de uma peça'
                value={searchQuery}
                onChange={handleSearchInputChange} // Atualiza o estado de pesquisa ao digitar
                onKeyDown={handleKeyPress} // Detecta o pressionamento de Enter
                ></input>
              <i className='fa fa-search' style={style} onClick={handleSearch}></i>
            </div>

          <div className="card-container">
              {Object.keys(filteredPecas).map(key => (
              <div key={key}>
                  {Array.isArray(filteredPecas[key]) && filteredPecas[key].map((item, index) => (
                    <Card
                      key={index}
                      image={item.image || "https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/b/5/b550m-k61461v31.jpg"} // Exemplo de URL de imagem
                      nome={item.modelo || "Nome da Peça Exemplo"}
                      preco={item.preco || "00,00"}
                      link={item.site}
                    />
                  ))}
                </div>
            ))}
            </div>
          </div>
      </main>
    )
}