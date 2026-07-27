import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import type { User } from "../types/auth";

interface AuthContextData {
    user: User | null;
    token: string | null;
    signed: boolean;

    login: (token: string, user: User) => void;

    logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

interface Props {
    children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {

    const [user, setUser] = useState<User | null>(null);

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {

        const tokenStorage = localStorage.getItem("@coreflow:token");

        const userStorage = localStorage.getItem("@coreflow:user");

        if (tokenStorage && userStorage) {

            setToken(tokenStorage);

            setUser(JSON.parse(userStorage));

        }

    }, []);

    function login(token: string, user: User) {

        localStorage.setItem("@coreflow:token", token);

        localStorage.setItem(
            "@coreflow:user",
            JSON.stringify(user)
        );

        setToken(token);

        setUser(user);

    }

    function logout() {

        localStorage.removeItem("@coreflow:token");

        localStorage.removeItem("@coreflow:user");

        setToken(null);

        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                signed: !!token && !!user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}