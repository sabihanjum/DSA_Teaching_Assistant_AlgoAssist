
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProviderInner({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  
  // Only show the UI after the component is mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  // Import useTheme from next-themes directly
  const { theme, setTheme, resolvedTheme } = require("next-themes").useTheme();
  
  const isDarkMode = resolvedTheme === "dark";

  return {
    theme: (theme as Theme) || "system",
    setTheme: (theme: Theme) => setTheme(theme),
    isDarkMode
  };
};
