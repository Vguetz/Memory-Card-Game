// src/components/GameBoard.tsx

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { cardsData, CardType } from "../data/cardsData";
import { Howl } from "howler";
import matchSoundSrc from "../assets/sounds/match.mp3";
import failSoundSrc from "../assets/sounds/fail.mp3";
import flipSoundSrc from "../assets/sounds/flip.mp3";
import { v4 as uuidv4 } from "uuid";

const matchSound = new Howl({ src: [matchSoundSrc] });
const failSound = new Howl({ src: [failSoundSrc] });
const flipSound = new Howl({ src: [flipSoundSrc] });

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstChoice, setFirstChoice] = useState<CardType | null>(null);
  const [secondChoice, setSecondChoice] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<{ moves: number; time: number }>({
    moves: 0,
    time: 0,
  });
  const [level, setLevel] = useState<string>("easy");
  const [initiallyFlipped, setInitiallyFlipped] = useState<boolean>(false);

  // Seleccionar tarjetas según el nivel
  const selectCardsByLevel = (level: string): CardType[] => {
    switch (level) {
      case "easy":
        return cardsData.slice(0, 4); // 4 pares
      case "medium":
        return cardsData.slice(0, 6); // 6 pares
      case "hard":
        return cardsData.slice(0, 8); // 8 pares
      case "impossible":
        return cardsData.slice(0, 16); // 16 pares (32 tarjetas)
      default:
        return cardsData.slice(0, 4);
    }
  };

  const gridColsMap: { [key: string]: string } = {
    easy: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    medium: "grid-cols-3 sm:grid-cols-4 md:grid-cols-3",
    hard: "grid-cols-4 sm:grid-cols-5 md:grid-cols-4",
    impossible: "grid-cols-4 sm:grid-cols-8 md:grid-cols-8",
  };
  const maxWidthMap: { [key: string]: string } = {
    easy: "max-w-2xl", // 42rem
    medium: "max-w-3xl", // 48rem
    hard: "max-w-4xl", // 56rem
    impossible: "max-w-6xl", // 72rem
  };
  const maxWidthClass = maxWidthMap[level] || maxWidthMap["easy"];

  const gridColsClass = gridColsMap[level] || gridColsMap["easy"];

  // Mezclar las tarjetas y duplicarlas

  // src/components/GameBoard.tsx

  const shuffleCards = () => {
    const selectedCards = selectCardsByLevel(level);
    console.log(`Nivel seleccionado: ${level}`);
    console.log(`Número de tarjetas seleccionadas: ${selectedCards.length}`);

    const shuffledCards = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4(), matched: false })); // Usando uuidv4()

    console.log(
      `Número total de tarjetas después de duplicar: ${shuffledCards.length}`
    );

    setCards(shuffledCards);
    setFirstChoice(null);
    setSecondChoice(null);
    setMoves(0);
    setTime(0);
    setGameOver(false);
    setInitiallyFlipped(true); // Mostrar todas las tarjetas

    // Iniciar el temporizador para voltear las tarjetas después de 3 segundos
    setTimeout(() => {
      setInitiallyFlipped(false);
    }, 3000);
  };

  useEffect(() => {
    if (initiallyFlipped) {
      const timer = setTimeout(() => {
        setInitiallyFlipped(false);
      }, 3000);

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [initiallyFlipped]);

  // Manejar la selección de una tarjeta
  const handleChoice = (card: CardType) => {
    flipSound.play();
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // Comparar dos selecciones
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.name === secondChoice.name) {
        matchSound.play();
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.name === firstChoice.name ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        failSound.play();
        setTimeout(() => resetTurn(), 1000);
      }
      setMoves((prevMoves) => prevMoves + 1);
    }
  }, [firstChoice, secondChoice]);

  // Verificar si el juego ha terminado
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
      if (
        bestScore.moves === 0 ||
        moves < bestScore.moves ||
        (moves === bestScore.moves && time < bestScore.time)
      ) {
        const newBest = { moves, time };
        setBestScore(newBest);
        localStorage.setItem("bestScore", JSON.stringify(newBest));
      }
    }
  }, [cards, moves, time, bestScore]);

  // Resetear las selecciones
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  // Iniciar el temporizador
  useEffect(() => {
    let timer: number;
    if (!gameOver) {
      timer = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameOver]);

  // Iniciar el juego al cargar y cuando cambie el nivel
  useEffect(() => {
    shuffleCards();
    // Obtener el mejor puntaje desde localStorage
    const savedScore = localStorage.getItem("bestScore");
    if (savedScore) {
      setBestScore(JSON.parse(savedScore));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  return (
    <div className="flex flex-col items-center p-4 bg-violet-300 min-h-screen">
      <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-2xl">
        <button
          onClick={shuffleCards}
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Restart Game
        </button>
        <div className="text-lg text-violet-800">Movements: {moves}</div>
        <div className="text-lg text-violet-800">Time: {time} s</div>
        <div className="flex items-center space-x-2">
          <label htmlFor="level" className="text-lg text-violet-800">
            Level:
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border border-violet-500 rounded px-2 py-1 bg-violet-100 text-violet-800"
          >
            <option value="easy">Easy Peasy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="impossible">Impossible?</option>
          </select>
        </div>
        <div className="text-lg text-violet-800">
          Best Movements: {bestScore.moves}
        </div>
        <div className="text-lg text-violet-800">
          Best Time: {bestScore.time} s
        </div>
      </div>
      <div
        className={`grid items-center justify-center ${gridColsClass} ${maxWidthClass} gap-4 w-full bg-violet-200 p-4 rounded-lg`}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              initiallyFlipped ||
              card === firstChoice ||
              card === secondChoice ||
              card.matched
            }
            disabled={disabled || initiallyFlipped}
          />
        ))}
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-violet-200 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-violet-800">
              Congratulations!
            </h2>
            <p className="mb-4 text-violet-700">
              You completed the game in {moves} movements and {time} seconds.
            </p>
            <button
              onClick={shuffleCards}
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Play Again!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
