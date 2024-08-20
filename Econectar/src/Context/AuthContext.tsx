import React, { createContext, ReactNode, useState } from 'react';
import { UsuarioLogin } from '../Models/UsuarioLogin'; 
import { toastAlerta } from '../Util/Toastalert';
import { login } from '../Service/Services';

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
        usuario: '',
        nome: '',
        senha: '',
        endereco: '',
        cpf: '',
        dataNascimento: '',
        foto: '',
        servicosVendidos: [],
        servicosComprados: [],
        token: '',
        cover: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await login('/usuarios/logar', userLogin, setUsuario);
            toastAlerta('Login realizado com sucesso', 'info');
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            toastAlerta('Erro ao realizar login', 'error');
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            usuario: '',
            nome: '',
            senha: '',
            endereco: '',
            cpf: '',
            dataNascimento: '',
            foto: '',
            servicosVendidos: [],
            servicosComprados: [],
            token: '',
            cover: ''
        });
        toastAlerta('Logout realizado com sucesso', 'info');
    }

    return (
        <AuthContext.Provider value={{ usuario, setUsuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
