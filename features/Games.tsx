
import React, { useState, useEffect } from 'react';

type Game = 'tictactoe' | 'quiz' | 'spinner';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (i: number) => (
    <button
      className={`w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-lg text-4xl font-bold flex items-center justify-center transition-colors hover:bg-white/20 
      ${board[i] === 'X' ? 'text-sky-300' : 'text-indigo-300'}`}
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </button>
  );
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(Boolean)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${isXNext ? 'X (Achraf)' : 'O (Sara)'}`;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-semibold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
      </div>
      <button onClick={resetGame} className="mt-4 bg-indigo-500 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-400 transition-colors">Reset Game</button>
    </div>
  );
};

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const RomanticQuiz = () => {
    const questions = [
        { question: "What's Achraf's favorite color?", answer: "Blue" },
        { question: "Where was your first date?", answer: "The cafe downtown" },
        { question: "What is Sara's dream vacation spot?", answer: "Bali" },
    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const nextQuestion = () => {
        setShowAnswer(false);
        setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }
    
    return (
        <div className="text-center p-6 bg-white/10 rounded-2xl w-full max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h3>
            {showAnswer && <p className="text-xl text-indigo-300 my-4 p-4 bg-black/20 rounded-lg">{questions[currentQuestion].answer}</p>}
            <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => setShowAnswer(true)} className="bg-sky-500 px-6 py-2 rounded-lg font-semibold hover:bg-sky-400 transition-colors">Show Answer</button>
                <button onClick={nextQuestion} className="bg-indigo-500 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-400 transition-colors">Next Question</button>
            </div>
        </div>
    );
}

const LoveSpinner = () => {
    const challenges = ["Give a 5-minute massage", "Share a favorite memory", "Sing a love song", "Plan the next date", "Give a heartfelt compliment", "Cook a meal together"];
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState("");

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setResult("");
        const randomIndex = Math.floor(Math.random() * challenges.length);
        setTimeout(() => {
            setResult(challenges[randomIndex]);
            setSpinning(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative w-64 h-64 rounded-full border-4 border-dashed border-indigo-400 flex items-center justify-center">
                 <div className={`w-full h-full rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 transition-transform duration-[3000ms] ease-out ${spinning ? 'animate-spin' : ''}`}></div>
                 <div className="absolute text-center">
                    {result ? <p className="text-2xl font-bold p-4 animate-pulse">{result}</p> : <p className="text-xl">Spin for a challenge!</p>}
                 </div>
            </div>
            <button onClick={spin} disabled={spinning} className="bg-gradient-to-r from-sky-500 to-indigo-500 px-8 py-3 rounded-lg text-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                {spinning ? 'Spinning...' : 'Spin!'}
            </button>
        </div>
    );
}

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game>('tictactoe');

  const gameComponents: Record<Game, React.ReactNode> = {
    tictactoe: <TicTacToe />,
    quiz: <RomanticQuiz />,
    spinner: <LoveSpinner />,
  };
  
  const gameInfo: Record<Game, {name: string, description: string}> = {
    tictactoe: { name: "لعبة X و O", description: "Classic Tic Tac Toe" },
    quiz: { name: "Romantic Quiz", description: "Test your knowledge" },
    spinner: { name: "Love Spinner", description: "A fun challenge" },
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 md:gap-4 mb-8 bg-black/20 p-2 rounded-xl">
        {(['tictactoe', 'quiz', 'spinner'] as Game[]).map((game) => (
          <button
            key={game}
            onClick={() => setActiveGame(game)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm md:text-base ${activeGame === game ? 'bg-sky-500 text-white' : 'hover:bg-white/10'}`}
          >
            {gameInfo[game].name}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-3xl font-bold mb-2 text-sky-300">{gameInfo[activeGame].name}</h3>
        <p className="text-indigo-300 mb-8">{gameInfo[activeGame].description}</p>
        {gameComponents[activeGame]}
      </div>
    </div>
  );
};

export default Games;
