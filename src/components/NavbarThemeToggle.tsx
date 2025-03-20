
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export function NavbarThemeToggle() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex items-center ml-2">
      {isAuthenticated && (
        <ThemeToggle />
      )}
    </div>
  );
}
