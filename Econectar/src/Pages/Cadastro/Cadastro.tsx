import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';
import Usuario from '../../Models/Usuario';
import { cadastrarUsuario } from '../../Service/Services';


function Cadastro() {
    let navigate = useNavigate();

    const [confirmaSenha, setConfirmaSenha] = useState<string>("");

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        cpf: '',
        endereco: '',
        dataNascimento: new Date()
    });

    const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        cpf: '',
        endereco: '',
        dataNascimento: new Date()
    });

    useEffect(() => {
        if (usuarioResposta.id !== 0) {
            back();
        }
    }, [usuarioResposta]);

    function back() {
        navigate('/login');
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value);
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
            try {
                if(usuario.foto == "" || usuario.foto == null){
                    usuario.foto = "https://media.discordapp.net/attachments/1255176758466969620/1275521477894078706/E-_Conectar.png?ex=66c82bb2&is=66c6da32&hm=c870de1b2f1e9394f50660d99a977a4e2048eb848f8417b023256916780a3704&=&format=webp&quality=lossless&width=449&height=449"
                }
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta);
                alert('Usuário cadastrado com sucesso');
            } catch (error) {
                alert('Erro ao cadastrar o Usuário');
            }
        } else {
            alert('Dados inconsistentes. Verifique as informações de cadastro.');
            setUsuario({ ...usuario, senha: "" }); // Reinicia o campo de Senha
            setConfirmaSenha("");                  // Reinicia o campo de Confirmar Senha
        }
    }

    return (
        <>
        <div className="grid grid-cols-1 h-screen place-items-center font-bold bg-custom flex justify-center items-center min-h-screen">
            <div className="bg-cadastro box-cadastro p-8 rounded-lg shadow-lg">
                <form id="cadastroForm" onSubmit={cadastrarNovoUsuario}>
                <h2 className="text-2xl font-bold text-center text-indigo-700 mb-8">Cadastro</h2>
                <div className="columns-2 gap-10">
                <div className="mb-4">
                    <label htmlFor="usuario" className="block text-gray-700 mb-2">Email:</label>
                    <input type="email" id="usuario" name="usuario" required className="w-full ring-2 ring-gray-300 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="nome" className="block text-gray-700 mb-2">Nome:</label>
                    <input type="text" id="nome" name="nome" required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="cpf" className="block text-gray-700 mb-2">CPF:</label>
                    <input type="text" id="cpf" name="cpf" required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.cpf}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="endereco" className="block text-gray-700 mb-2">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.endereco}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="dataNascimento" className="block text-gray-700 mb-2">Data Nascimento:</label>
                    <input type="date" id="dataNascimento" name="dataNascimento" required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.dataNascimento.toString()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="foto" className="block text-gray-700 mb-2">Link de Foto:</label>
                    <input type="text" id="foto" name="foto" className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   value={usuario.foto}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="senha" className="block text-gray-700 mb-2">Senha:</label>
                    <input type="password" id="senha" name="senha" required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={usuario.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmaSenha" className="block text-gray-700 mb-2">Confirmar senha:</label>
                    <input type="password" id="confirmaSenha" name="confirmaSenha" required className="w-full px-3 ring-2 ring-gray-300 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={confirmaSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}/>
                </div>
                </div>
                <div className='grid justify-items-end'>
                <button type="submit" className="w-2/4 bg-azul-padrao text-white py-2 rounded-full hover:bg-amber-600 transition-colors">Enviar</button>
                <Link to="/login" className="block text-center text-indigo-600 mt-4 hover:underline">Já tem login? Entre</Link>
                </div>
                </form>
                </div>
            </div>
            
        </> 
    );
} 

export default Cadastro;