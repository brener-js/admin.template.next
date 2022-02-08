import { createContext, useEffect, useState } from "react";

// type Theme = "dark" | "";

interface AppContextProps {
  theme?: string;
  handleTheme?: () => void;
}

const AppContext = createContext<AppContextProps>({});

export function AppProvider(props) {
  const [theme, setTheme] = useState("dark");

  function handleTheme() {
    const newTheme = theme === "" ? "dark" : "";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  useEffect(() => {
    const currentlyTheme = localStorage.getItem("theme");
    setTheme(currentlyTheme);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        handleTheme,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
