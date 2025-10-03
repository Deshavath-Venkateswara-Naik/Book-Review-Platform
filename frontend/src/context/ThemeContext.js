import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('dark', dark);
  }, [dark]);

  const toggle = () => setDark(prev => !prev);

  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>
};
