import React, { useEffect, useState } from 'react';
import style from '../../style.module.css';

function RankingPage() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRanking() {
      try {
        const res = await fetch('http://localhost:5001/ranking'); // Endpoint para buscar o ranking
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setRanking(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []);

  if (loading) {
    return <div className={style.rankingContainer}>Carregando ranking...</div>;
  }

  if (error) {
    return <div className={style.rankingContainer}>Erro ao carregar ranking: {error}</div>;
  }

  return (
    <div className={style.rankingContainer}>
      <h1>Ranking dos Resultados</h1>
      {ranking.length === 0 ? (
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
            {ranking.map((item, index) => (
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
    </div>
  );
}

export default RankingPage;


