import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../Models/UsuarioLogin";
import { toastAlerta } from "../Util/Toastalert";
import { login } from "../Service/Services";


interface AuthContextProps {
    usuario: UsuarioLogin;
    setUsuario: React.Dispatch<React.SetStateAction<UsuarioLogin>>;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        dataNascimento: new Date(),
        token: "",
        cover: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario)
            toastAlerta('Você precisa estar logado', 'info');
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toastAlerta('Você precisa estar logado', 'info');
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            dataNascimento: new Date(),
            token: "",
            cover : ""
        });
    }

    return (
        <AuthContext.Provider value={{ usuario, setUsuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
