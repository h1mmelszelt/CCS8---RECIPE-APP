import { ChakraProvider, extendTheme} from "@chakra-ui/react";
import { createContext, useState, useContext } from "react";

// Create a context for theme toggling
const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

// Define light and dark themes
const lightTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      },
    },
  },
});

const darkTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.800",
        color: "white",
      },
    },
  },
});

export const CustomThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ChakraProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ChakraProvider>
    </ThemeToggleContext.Provider>
  );
};