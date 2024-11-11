import React from 'react'
import {Link} from 'react-router-dom'

export default function Ajuda(){
  return(
    <main>
      <p><Link to="/" className="navigation"><span>Home</span></Link> / Ajuda</p>
      <div className='container'>
        <h2>Tutorial de Montagem</h2>

        {/* https://www.youtube.com/watch?v=6uVbxr09DBE
        Tornace necessario remover o 'watch' e trocar por 'embed' e trocar o 'v=' para '/' */}
        <iframe src="https://www.youtube.com/embed/6uVbxr09DBE" allowFullScreen={true}/>

        <h2> Passo a Passo</h2>

        <p className='txt'>
          Montar seu próprio PC é uma experiência gratificante e que te permite ter um computador totalmente personalizado. Neste guia, vamos te levar passo a passo por todo o processo, desde a escolha dos componentes até a configuração final.
        </p>

        <p className='txt'>
        Aqui estão algumas dicas adicionais para montar um PC:
        </p>
        
        <ul className='txt'>
          <li>Leia o manual da placa-mãe antes de começar.</li>
          <li>Use uma pulseira antiestática para evitar danos aos componentes eletrônicos.</li>
          <li>Certifique-se de que todos os componentes estão bem presos antes de ligar o PC.</li>
          <li>Se você tiver problemas para montar o PC, consulte um técnico de informática.</li>
        </ul>

        <p className='txt'>
          Lembre-se: A montagem de um PC exige paciência e atenção aos detalhes. Se você seguir este guia e tiver cuidado, você terá um PC funcionando em pouco tempo.
        </p>
        
        <ol className='txt'>
          <li><span>Reúna seus componentes.</span> Você precisará de um gabinete, uma placa-mãe, um processador, memória RAM, uma placa de vídeo, um disco rígido ou SSD, uma fonte de alimentação e cabos de conexão.</li>
          <li><span>Instale a placa-mãe no gabinete.</span> Certifique-se de que a placa-mãe está alinhada com os parafusos do gabinete.</li>
          <li><span>Instale o processador.</span> Certifique-se de que o processador está alinhado com os pinos da placa-mãe.</li>
          <li><span>Instale a memória RAM.</span> Certifique-se de que a memória RAM está alinhada com os slots da placa-mãe.</li>
          <li><span>Instale a placa de vídeo.</span> Certifique-se de que a placa de vídeo está alinhada com o slot PCI Express da placa-mãe</li>.
          <li><span>Instale o disco rígido ou SSD.</span> Certifique-se de que o disco rígido ou SSD está alinhado com os parafusos do gabinete.</li>
          <li><span>Conecte a fonte de alimentação.</span> Certifique-se de que a fonte de alimentação está conectada à placa-mãe e ao gabinete.</li>
          <li><span>Conecte os cabos de conexão.</span> Certifique-se de que todos os cabos de conexão estão conectados corretamente.</li>
          <li><span>Ligue o PC.</span> Se tudo estiver conectado corretamente, o PC deve ligar.</li>
        </ol>
      </div>
    </main>
  )
}