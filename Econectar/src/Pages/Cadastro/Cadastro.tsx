import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bgcadastro">
                <div className="fundoCadastro hidden lg:block"></div>
                <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={cadastrarNovoUsuario}>
                    <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="foto">Foto</label>
                        <input
                            type="text"
                            id="foto"
                            name="foto"
                            placeholder="Foto"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="CPF"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.cpf}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="endereco">Endereço</label>
                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            placeholder="Endereço"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.endereco}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            placeholder="Data de Nascimento"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.dataNascimento.toString()}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Confirmar Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={confirmaSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                        />
                    </div>
                    
                    <div className="flex justify-around w-full gap-8">
                        <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' onClick={back}>
                            Cancelar
                        </button>
                        <button className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2' type='submit'>
                            Cadastrar
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default Cadastro;