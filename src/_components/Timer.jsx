import React, { useState, useEffect } from 'react';

function Timer() {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutos em segundos
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsTimeUp(true);
            return; // Interrompe o efeito se o tempo acabou
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
            <p className={style.timerText}>
                {isTimeUp ? 'Tempo esgotado!' : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
            </p>
        </div>
    );
}

export default Timer;