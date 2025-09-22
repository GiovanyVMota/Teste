// src/context/BackgroundContext.jsx
import { createContext, useState } from 'react';

export const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const changeBackground = (url) => {
    setBackgroundImage(url);
  };

  return (
    <BackgroundContext.Provider value={{ backgroundImage, changeBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};