// src/components/Card.tsx

import React from "react";
import { CardType } from "../data/cardsData";

interface CardProps {
  card: CardType;
  handleChoice: (card: CardType) => void;
  flipped: boolean;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({
  card,
  handleChoice,
  flipped,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled && !card.matched) {
      handleChoice(card);
    }
  };

  return (
    <div className="flip-container w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
      <div
        className={`flip-card relative w-full h-full transition-transform duration-600 ${
          flipped ? "flipped" : ""
        }`}
        role="button"
        aria-pressed={flipped}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
      >
        {/* Parte frontal de la tarjeta */}
        <div
          className="flip-card-front absolute inset-0 flex justify-center items-center bg-violet-500 text-white text-xl font-semibold rounded-lg cursor-pointer shadow-md"
          onClick={handleClick}
          aria-hidden={flipped}
        >
          📁
        </div>

        {/* Parte trasera de la tarjeta */}
        <img
          src={card.image}
          alt={card.name}
          className="flip-card-back absolute inset-0 object-cover rounded-lg cursor-pointer shadow-md"
          onClick={handleClick}
          aria-hidden={!flipped}
        />
      </div>
    </div>
  );
};

export default React.memo(Card);
