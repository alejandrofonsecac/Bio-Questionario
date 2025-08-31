import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Random from './_components/Random.jsx';

import style from '../style.module.css'


function App() {

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
            {texto: 'Gato', correta: false},
            {texto: 'Cavalo', correta: false},
            {texto: 'Cão', correta: true},
            {texto: 'Galinha', correta: false}
        ],
    },
    {
        id: 13,
        pergunta: 'O que marcou a transição do Pleistoceno para o Holoceno?',
        opcoes: [
            {texto: 'Extinção dos dinossauros', correta: false},
            {texto: 'A última grande glaciação', correta: true},
            {texto: 'Surgimento dos primeiros primatas', correta: false },
            {texto: 'Separação dos continentes atuais', correta: false}
        ],
    },
    {
        id: 14,
        pergunta: 'O termo "Antropoceno" é usado para indicar:',
        opcoes: [
            {texto: 'Uma nova era geológica oficial', correta: false},
            {texto: 'Um período caracterizado pela ação humana no ambiente', correta: true },
            {texto: 'Uma época de vulcanismo intenso', correta: false},
            {texto: 'O fim das glaciações', correta: false}
        ],
    },
    {
        id: 15,
        pergunta: 'Qual inovação cultural no Holoceno permitiu maior organização social e surgimento de vilas e cidades?',
        opcoes: [
            {texto: 'Pintura rupestre', correta: false},
            {texto: 'Agricultura e sedentarismo', correta: true},
            {texto: 'Caça e coleta', correta: false},
            {texto: 'Uso do fogo', correta: false}
        ],
    }
];



  return (
    <>
        <div className={style.corpo}>
            <div className={style.container}>
                <h1>Quiz de Evoução Humana</h1>
            </div>
            
            <div style={{display: 'none'}}>
                <div id='Timer'></div>
            
                <Random perguntas={perguntas}/>
            </div>
        </div>
    </>
  )
}

export default App
