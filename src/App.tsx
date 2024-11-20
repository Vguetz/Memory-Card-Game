// src/App.tsx

import React from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-violet-400">
      <Header />
      <GameBoard />
    </div>
  );
};

export default App;
