import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import API from "../api/request";

interface User {
  name(name: any): unknown;
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // fetch user if token exists
  useEffect(() => {
    if (token) {
      API.get("/user/profile")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (newToken: string, user: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
