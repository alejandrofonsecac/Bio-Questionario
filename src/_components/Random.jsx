import React, { useState, useMemo } from "react";
import style from '../../style.module.css'

function Random({ perguntas }) {
  const [respostas, setRespostas] = useState({});

  // Embaralha só uma vez quando o componente é montado
  const perguntasSelecionadas = useMemo(() => {
    const perguntasEmbaralhadas = [...perguntas];

    for (let i = perguntasEmbaralhadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [perguntasEmbaralhadas[i], perguntasEmbaralhadas[j]] =
        [perguntasEmbaralhadas[j], perguntasEmbaralhadas[i]];
    }

    return perguntasEmbaralhadas.slice(0, 10);
  }, [perguntas]);

  const handleClick = (perguntaId, opcao) => {
    setRespostas(prev => ({
      ...prev,
      [perguntaId]: opcao
    }));
  };

  return (
    <div id="quiz">
      {perguntasSelecionadas.map((pergunta, index) => (
        <div key={pergunta.id} className="pergunta-card">
          <h3>{index + 1}. {pergunta.pergunta}</h3>

          <div className="opcoes">
            {pergunta.opcoes.map((opcao, opcaoIndex) => {
              const resposta = respostas[pergunta.id];
              let className = "opcao-botao";

              if (resposta && resposta.texto === opcao.texto) {
                className += resposta.correta ? " correto" : " errado";
              }

              return (
                <button
                  key={opcaoIndex}
                  onClick={() => handleClick(pergunta.id, opcao)}
                  className={className}
                  disabled={!!resposta}
                >
                  {opcao.texto}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Random;
