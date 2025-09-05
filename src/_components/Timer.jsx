import React, { useState, useEffect } from 'react';
import './Timer.css'

function Timer() {
    const [timeLeft, setTimeLeft] = useState(180); 
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsTimeUp(true);
            alert('O tempo esgotou')
            return; 
        }

        // Configura o intervalo para decrementar o tempo a cada segundo
        const timerInterval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Função de limpeza para evitar vazamento de memória
        return () => clearInterval(timerInterval);
    }, [timeLeft]); // A dependência garante que o efeito seja executado a cada mudança em `timeLeft`

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div id="Timer">
            <p>
                
                    <img src="../../public/relogio.png" alt="" />
                    {isTimeUp ? 'Tempo esgotado!' : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                
            </p>
        </div>
    );
}

export default Timer;