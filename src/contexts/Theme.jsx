import React, { useContext, useState, useEffect, useRef } from "react";

const ThemeContext = React.createContext();
const ThemeTogglerContext = React.createContext();
const ThemeResetterContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeToggler() {
  return useContext(ThemeTogglerContext);
}

export function useThemeResetter() {
  return useContext(ThemeResetterContext);
}

function getPreferredColorScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(("theme" in localStorage) ? localStorage.theme : "system");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (theme === "system") {
      localStorage.setItem("theme", "system");

      if (getPreferredColorScheme() === "dark") {
        document.documentElement.classList.add("dark");
      }
      else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else if (theme === "system") {
      if (getPreferredColorScheme() === "dark") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }
  }

  function resetTheme() {
    setTheme("system");
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeTogglerContext.Provider value={toggleTheme}>
        <ThemeResetterContext.Provider value={resetTheme}>
          { children }
        </ThemeResetterContext.Provider>
      </ThemeTogglerContext.Provider>
    </ThemeContext.Provider>
  );
}
