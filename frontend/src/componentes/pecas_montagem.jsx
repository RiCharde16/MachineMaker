import React, {useState, useEffect} from 'react'
import image from '../img/plus.svg'

const containerStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '50px', // Ajuste a largura conforme necessário
  height: '50px', // Ajuste a altura para formar um círculo perfeito
};

const selectStyle = {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundColor: 'transparent', // Torna o fundo transparente
  border: 'none', // Remove a borda
  borderRadius: '50%', // Formato circular
  cursor: 'pointer',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: 1, // Mantém o select acima
  opacity: 0, // Torna o select invisível
};

const iconStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', // Centraliza a imagem
  width: '20px', // Ajuste o tamanho da imagem
  pointerEvents: 'none', // Ignora eventos de mouse na imagem
  zIndex: 0, // A imagem fica atrás do select invisível
}

const preco_style = {
  fontWeight: '600'
}

export default function Pecas_montagem(props){
  const [modelo, setModelo] = useState({
    preco: '00,00',
    loja: 'Americas',
    site: 'sei la'
  })
  const handleChange=(event)=>{
    const novoModelo = event.target.selectedOptions[0].dataset
    
    setModelo(novoModelo)
    
    props.onChangeModelo(novoModelo);
  }
  
  return(
    <tr>
      <td>{props.peca}</td>
      <td>
        <div style={containerStyle}>
          <img src={image} alt="sinal de soma" style={iconStyle} />
          <select style={selectStyle} onChange={handleChange} defaultValue="">
            <option value="" disabled>Selecione um modelo</option>
            {props.modelo.map((item, index) => (
              <option key={index} data-preco={item.preco} data-loja={item.loja} data-site={item.site} data-modelo={item.modelo}>
                {item.modelo}
              </option>
            ))}
          </select>
        </div>
          <p>{modelo.modelo || ""}</p>
      </td>
      <td style={preco_style}> R$: {parseFloat(modelo.preco).toFixed(2).replace(".",",")}</td>
      <td><a href={modelo.site} target='_blank'>{modelo.loja}</a></td>
    </tr>
  )
}

Pecas_montagem.defaultProps = {
  peca: "indefinido",
  preco: "00,00",
  loja: "Americanas",
  modelo: ['Inel core i5', 'Rizen 5'],
}