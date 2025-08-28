import React from "react";

function Random({ perguntas }) {
  const perguntasEmbaralhadas = [...perguntas];
  
  // Embaralhar
  for (let i = perguntasEmbaralhadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perguntasEmbaralhadas[i], perguntasEmbaralhadas[j]] = 
    [perguntasEmbaralhadas[j], perguntasEmbaralhadas[i]];
  }
  
  const perguntasSelecionadas = perguntasEmbaralhadas.slice(0, 10);

  return (
    <div id="quiz">
      {perguntasSelecionadas.map((pergunta, index) => (
        <div key={pergunta.id} className="pergunta-card">
          <h3>{index + 1}. {pergunta.pergunta}</h3> {/* Pergunta.pergunta é a pergunta dentro do array */}
          
          <div className="opcoes">
            {pergunta.opcoes.map((opcao, opcaoIndex) => (
              <div key={opcaoIndex} className="opcao">
                <input 
                  type="radio" 
                  id={`pergunta-${pergunta.id}-opcao-${opcaoIndex}`}
                  name={`pergunta-${pergunta.id}`}
                  value={opcao.texto}
                />
                <label htmlFor={`pergunta-${pergunta.id}-opcao-${opcaoIndex}`}>
                  {opcao.texto}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Random;