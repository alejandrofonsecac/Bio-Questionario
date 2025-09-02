import React, { useState, useMemo } from "react";
import style from '../style.module.css';

function Random({ perguntas, onFinish, nome, disabled }) {
  const [respostas, setRespostas] = useState({});

  const perguntasSelecionadas = useMemo(() => {
    const arr = [...perguntas];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 10);
  }, [perguntas]);

  const handleClick = (perguntaId, opcao) => {
    setRespostas(prev => ({ ...prev, [perguntaId]: opcao }));
  };

  const todasRespondidas = perguntasSelecionadas.every(p => !!respostas[p.id]);

  function finalizarEnvio() {
    const rows = perguntasSelecionadas.map(p => {
      const sel = respostas[p.id] || null;
      const corretaObj = p.opcoes.find(o => o.correta);
      return {
        qid: p.id,
        question: p.pergunta,
        selected: sel ? sel.texto : null,
        correct: corretaObj ? corretaObj.texto : null,
        isCorrect: sel ? !!sel.correta : false,
      };
    });
    const score = rows.filter(r => r.isCorrect).length;
    const total = perguntasSelecionadas.length;
    onFinish?.({ rows, score, total });
  }

  return (
    <div className={style.quizWrapper}>
      {perguntasSelecionadas.map((pergunta, idx) => (
        <div key={pergunta.id} className={style.perguntaCard}>
          <h3>{idx + 1}. {pergunta.pergunta}</h3>

          <div className={style.opcoes}>
            {pergunta.opcoes.map((opcao, i) => {
              const resposta = respostas[pergunta.id];
              let className = style.opcao;
              if (resposta && resposta.texto === opcao.texto) {
                className += ' ' + (resposta.correta ? style.correto : style.errado);
              }
              return (
                <button
                  key={i}
                  onClick={() => handleClick(pergunta.id, opcao)}
                  className={className}
                  disabled={!!resposta || disabled}
                >
                  {opcao.texto}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className={style.footerQuiz}>
        <button
          className={style.buttonSubmit}
          onClick={finalizarEnvio}
          disabled={!todasRespondidas || disabled}
          title={!todasRespondidas ? 'Responda todas as questões' : 'Enviar respostas'}
        >
          Finalizar e Enviar
        </button>
      </div>
    </div>
  );
}

export default Random;
