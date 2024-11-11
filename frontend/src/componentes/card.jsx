import React from 'react'


export default function Card(props){
  return(
    <a href={props.link} target='_blank'>
      <div id="card">
        <div id="card_img">
          <img src={props.image}/>
        </div>
        <div id="card_body">
          <h5>{props.nome}</h5>
          <p>R$ {props.preco}</p>
        </div>
      </div>
    </a>
  )
}

Card.defaultProps = {
  image: "",
  nome: "null",
  preco: "123,00"
}