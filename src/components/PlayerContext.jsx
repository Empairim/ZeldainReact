import React, { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [animations, setAnimations] = useState(null);

  return (
    <PlayerContext.Provider value={{ animations, setAnimations }}>
      {children}
    </PlayerContext.Provider>
  );
};
