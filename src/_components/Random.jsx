import React, { useState, useMemo, useEffect } from "react";
import style from '../../main.module.css';

function Random({ perguntas, onFinish, nome, disabled }) {




  const [timeLeft, setTimeLeft] = useState(180); 
      const [isTimeUp, setIsTimeUp] = useState(false);
      //Ola
  
      useEffect(() => {
          if (timeLeft <= 0) {
              setIsTimeUp(true);
              alert('O tempo esgotou')
              finalizarEnvio()
              return;
          }
  
          // Configura o intervalo para decrementar o tempo a cada segundo
          const timerInterval = setInterval(() => {
              setTimeLeft(prevTime => prevTime - 1);
          }, 1000);
  
          // Função de limpeza para evitar vazamento de memória
          return () => clearInterval(timerInterval);
      }, [timeLeft]);
  
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;




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

  const todasRespondidas = perguntasSelecionadas.every(p => !!respostas[p.id]);

  function finalizarEnvio() {
    if (!onFinish) return;
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
    onFinish({ rows, score, total });

    const timer = document.getElementById('Timer');
    timer.style.display = 'none';
  }

  return (
    <>
    

    <div id="quiz" className={style.container}>
      {perguntasSelecionadas.map((pergunta, index) => (
        <div key={pergunta.id} style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          padding: '14px',
          marginBottom: '12px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontFamily: 'var(--fonte-titulo)', fontWeight: 600 }}>
            {index + 1}. {pergunta.pergunta}
          </h3>

          <div className={style.opcoes}>
            {pergunta.opcoes.map((opcao, opcaoIndex) => {
              const resposta = respostas[pergunta.id];

              // base class (com hífen) precisa de bracket-notation
              let className = style['opcao-botao'];

              // adicionar o modificador (correto/errado) – CSS tem ".opcao-botao.correto/errado"
              if (resposta && resposta.texto === opcao.texto) {
                className += ' ' + (resposta.correta ? style.correto : style.errado);
              }

              return (
                <button
                  key={opcaoIndex}
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

      {/* Botão Finalizar (opcional) — só mostra quando todas respondidas e se onFinish existir */}
      {typeof onFinish === 'function' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <button
            className={style.buttonSubmit}
            onClick={() => {
              finalizarEnvio();
              Oneclick();
            }}
            disabled={!todasRespondidas || disabled}
            title={!todasRespondidas ? 'Responda todas as questões' : 'Enviar respostas'}
          >
            Finalizar e Enviar
          </button>
        </div>
      )}
    </div>
  </>
  );
}

export default Random;
