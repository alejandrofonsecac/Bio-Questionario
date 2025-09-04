import { useState, useEffect } from 'react'
import Random from './_components/Random.jsx'
import style from './style.module.css'

import { Error, Help} from "@mui/icons-material";

function App() {
  const [name, setName] = useState('')
  const [started, setStarted] = useState(false)
  const [startedAt, setStartedAt] = useState(null)
  const [showRanking, setShowRanking] = useState(false) // Novo estado para controlar a exibição do ranking
  const [rankingData, setRankingData] = useState([]) // Estado para armazenar os dados do ranking
  const [loadingRanking, setLoadingRanking] = useState(false)
  const [rankingError, setRankingError] = useState(null)

  const perguntas = [
    {
      id: 1,
      pergunta: 'Em que era geológica está o Período Quaternário?',
      opcoes: [
        { texto: 'Mesozoica', correta: false },
        { texto: 'Cenozoica', correta: true },
        { texto: 'Paleozoica', correta: false },
        { texto: 'Arqueana', correta: false }
      ],
    },
    {
      id: 2,
      pergunta: 'Qual é a primeira época do Quaternário?',
      opcoes: [
        { texto: 'Holoceno', correta: false },
        { texto: 'Pleistoceno', correta: true },
        { texto: 'Triássico', correta: false },
        { texto: 'Jurássico', correta: false }
      ],
    },
    {
      id: 3,
      pergunta: 'Qual espécie humana surgiu há cerca de 300 mil anos?',
      opcoes: [
        { texto: 'Homo erectus', correta: false },
        { texto: 'Homo habilis', correta: false },
        { texto: 'Homo sapiens', correta: true },
        { texto: 'Homo neanderthalensis', correta: false }
      ],
    },
    {
      id: 4,
      pergunta: 'Qual recurso natural o Homo erectus aprendeu a controlar?',
      opcoes: [
        { texto: 'Água', correta: false },
        { texto: 'Vento', correta: false },
        { texto: 'Fogo', correta: true },
        { texto: 'Gelo', correta: false }
      ],
    },
    {
      id: 5,
      pergunta: 'O Holoceno começou há quantos anos?',
      opcoes: [
        { texto: '1 milhão', correta: false },
        { texto: '500 mil', correta: false },
        { texto: '11,7 mil', correta: true },
        { texto: '100 mil', correta: false }
      ],
    },
    {
      id: 6,
      pergunta: 'Cite um animal da megafauna do Pleistoceno.',
      opcoes: [
        { texto: 'Mamute', correta: true },
        { texto: 'Rinoceronte branco', correta: false },
        { texto: 'Cavalo selvagem', correta: false },
        { texto: 'Lobo cinzento', correta: false }
      ],
    },
    {
      id: 7,
      pergunta: 'O que permitiu o surgimento das primeiras civilizações no Holoceno?',
      opcoes: [
        { texto: 'Navegação marítima', correta: false },
        { texto: 'Agricultura', correta: true },
        { texto: 'Escrita', correta: false },
        { texto: 'Descoberta do bronze', correta: false }
      ],
    },
    {
      id: 8,
      pergunta: 'O que caracteriza o Antropoceno?',
      opcoes: [
        { texto: 'Mudanças climáticas naturais', correta: false },
        { texto: 'Impacto humano no planeta', correta: true },
        { texto: 'Extinção dos dinossauros', correta: false },
        { texto: 'Formação dos continentes', correta: false }
      ],
    },
    {
      id: 9,
      pergunta: 'Como as glaciações influenciaram o deslocamento humano no Pleistoceno?',
      opcoes: [
        { texto: 'Criaram pontes de gelo entre continentes', correta: true },
        { texto: 'Aumentaram as florestas tropicais', correta: false },
        { texto: 'Reduziram o nível do mar para sempre', correta: false },
        { texto: 'Forçaram a migração para os polos', correta: false }
      ],
    },
    {
      id: 10,
      pergunta: 'Qual a relação entre a extinção da megafauna e a chegada do Homo sapiens a novos territórios?',
      opcoes: [
        { texto: 'Não houve relação', correta: false },
        { texto: 'O clima ficou mais frio', correta: false },
        { texto: 'Caça excessiva contribuiu para a extinção', correta: true },
        { texto: 'Eles trouxeram novas doenças', correta: false }
      ],
    },
    {
      id: 11,
      pergunta: 'Durante o Pleistoceno, qual foi uma das principais adaptações humanas para sobreviver ao frio?',
      opcoes: [
        { texto: 'Uso de roupas feitas de pele de animais', correta: true },
        { texto: 'Domesticação do cavalo', correta: false },
        { texto: 'Construção de cidades', correta: false },
        { texto: 'Desenvolvimento da escrita', correta: false }
      ],
    },
    {
      id: 12,
      pergunta: 'Qual foi uma das primeiras espécies de animais domesticados pelo ser humano no Holoceno?',
      opcoes: [
        { texto: 'Gato', correta: false },
        { texto: 'Cavalo', correta: false },
        { texto: 'Cão', correta: true },
        { texto: 'Galinha', correta: false }
      ],
    },
    {
      id: 13,
      pergunta: 'O que marcou a transição do Pleistoceno para o Holoceno?',
      opcoes: [
        { texto: 'Extinção dos dinossauros', correta: false },
        { texto: 'A última grande glaciação', correta: true },
        { texto: 'Surgimento dos primeiros primatas', correta: false },
        { texto: 'Separação dos continentes atuais', correta: false }
      ],
    },
    {
      id: 14,
      pergunta: 'O termo "Antropoceno" é usado para indicar:',
      opcoes: [
        { texto: 'Uma nova era geológica oficial', correta: false },
        { texto: 'Um período caracterizado pela ação humana no ambiente', correta: true },
        { texto: 'Uma época de vulcanismo intenso', correta: false },
        { texto: 'O fim das glaciações', correta: false }
      ],
    },
    {
      id: 15,
      pergunta: 'Qual inovação cultural no Holoceno permitiu maior organização social e surgimento de vilas e cidades?',
      opcoes: [
        { texto: 'Pintura rupestre', correta: false },
        { texto: 'Agricultura e sedentarismo', correta: true },
        { texto: 'Caça e coleta', correta: false },
        { texto: 'Uso do fogo', correta: false }
      ],
    },
  ]

  function handleStart(e) {
    e.preventDefault()
    const nome = name.trim()
    if (!nome) return
    setStartedAt(new Date().toISOString())
    setStarted(true) // <- Mostra o quiz
    setShowRanking(false) // Garante que o ranking não está visível ao iniciar o quiz
  }

  async function fetchRanking() {
    setLoadingRanking(true);
    setRankingError(null);
    try {
      const res = await fetch("http://localhost:5001/ranking");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setRankingData(data);
    } catch (e) {
      setRankingError(e.message);
    } finally {
      setLoadingRanking(false);
    }
  }

  // (Opcional) Enviar resultado ao finalizar
  async function handleFinish({ score, total }) {
    const finishedAt = new Date().toISOString()
    const durationSeconds = (new Date(finishedAt) - new Date(startedAt)) / 1000

    const payload = {
      nome: name,
      score,
      total,
      durationSeconds,
      startedAt,
      finishedAt,
    }

    let res, body
    try {
      res = await fetch("http://localhost:5001/salvar_resultado", { // use URL absoluta no dev
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // Parse seguro (JSON se houver; senão, texto)
      const ct = res.headers.get("content-type") || ""
      if (ct.includes("application/json")) {
        body = await res.json()
      } else {
        const text = await res.text()
        // tente JSON; se não der, mantém texto
        try { body = JSON.parse(text) } catch { body = { raw: text } }
      }
    } catch (e) {
      alert("Falha de rede ou CORS: " + (e?.message || e))
      return
    }

    if (!res.ok || (body && body.sucesso === false)) {
      const msg = (body && (body.erro || body.message)) || `HTTP ${res.status}`
      alert("Erro ao enviar: " + msg)
      return
    }

    const id = body?.id || "(sem id)"
    alert(`Enviado! id: ${id}`)

    // Após enviar o resultado, oculta o quiz e mostra o ranking
    setStarted(false);
    await fetchRanking(); // Busca os dados do ranking atualizados
    setShowRanking(true);
  }

  return (
    <>
        <header>
          <div className={style.containerDna}>
            <img src="/dna.png" alt="Icone de DNA" className={style.iconDna}/>
            <p>BiologyQuiz</p>
          </div>

          <div className={style.containerTimer}>
            <img src="/relogio.png" alt="Icone de relogio" className={style.iconTimer} />
            <div id="Timer">
              <p className={style.timerText}></p>
            </div>
          </div>
        </header>


        <main>
            <div className={style.iconCerebro}>
              <img src="../../public/cerebro.png" alt="Icone de Cerebro"/>
            </div>


            <div className={style.containerForm}>
              <div className={style.titulo_subtitulo}>
                <h1>Quiz de Evolução <br/> Humana</h1>
                <p>Teste seus conhecimentos sobre a evolução da <br/> espécie
                humana</p>
              </div>
                      
              
                        {/* TELA INICIAL: aparece até clicar no botão */}
                        {!started && !showRanking && (
              <form id="form-jogador" onSubmit={handleStart}>
                <input
                  type="text"
                  id="inome"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Iniciar Quiz</button>
              </form>
                        )}
            </div>

          {/* QUIZ: aparece após clicar em "Iniciar Quiz" e enquanto o ranking não é exibido */}
          {started && !showRanking && (
            <Random
              perguntas={perguntas}
              nome={name}
              onFinish={handleFinish}
            />
          )}

          {/* RANKING: aparece após finalizar o quiz */}
          {showRanking && (
            <div className={style.rankingContainer}>
              <h1>Ranking dos Resultados</h1>
              {loadingRanking ? (
                <p>Carregando ranking...</p>
              ) : rankingError ? (
                <p>Erro ao carregar ranking: {rankingError}</p>
              ) : rankingData.length === 0 ? (
                <p>Nenhum resultado disponível ainda.</p>
              ) : (
                <table className={style.rankingTable}>
                  <thead>
                    <tr>
                      <th>Posição</th>
                      <th>Nome</th>
                      <th>Pontuação</th>
                      <th>Tempo (segundos)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankingData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.nome}</td>
                        <td>{item.score}/{item.total}</td>
                        <td>{item.durationSeconds.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button onClick={() => {
                setStarted(false);
                setShowRanking(false);
                setName('');
              }} className={style.buttonSubmit}>Voltar ao Início</button>
            </div>
          )}
        </main>

        <footer className={style.containerFooter}>
          <p>© 2025 BiologyQuiz. Ferramenta Educacional</p>

          <div className={style.containerIcons}>
            <div className={style.iconeInterrogacao}>
              <Help/>
            </div>
            <div className={style.iconeExclamacao}>
              <Error/>              
            </div>
          </div>
        </footer>
    </>
  )
}

export default App;


