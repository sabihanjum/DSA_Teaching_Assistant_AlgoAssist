
import { useTheme } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "@/hooks/use-toast";

export function NavbarThemeToggle() {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();

  return (
    <div className="flex items-center ml-2">
      <div 
        className={`p-1 rounded-md transition-colors duration-200 ${
          isDarkMode ? "bg-secondary/50" : "bg-transparent"
        }`}
      >
        <ThemeToggle />
      </div>
    </div>
  );
}
