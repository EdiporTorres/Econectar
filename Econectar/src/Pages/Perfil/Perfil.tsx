import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { toastAlerta } from '../../Util/Toastalert';


function Perfil() {
    let navigate = useNavigate();
    const { usuario, setUsuario } = useContext(AuthContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (usuario.token === '') {
            toastAlerta ('Dados inconsistentes. Verifique as informações de cadastro.', 'erro')
            navigate('/login');
        }
    }, [usuario.token, navigate]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, isCover: boolean = false) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (setUsuario) {
                    if (isCover) {
                        // Atualize a capa do perfil
                        setUsuario({ ...usuario, cover: reader.result as string });
                    } else {
                        // Atualize a foto do perfil
                        setUsuario({ ...usuario, foto: reader.result as string });
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = (isCover: boolean) => {
        if (isCover) {
            coverInputRef.current?.click();
        } else {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className='container mx-auto mt-4 rounded-2xl overflow-hidden'>
            <div className='relative'>
                <img className='w-full h-72 object-cover border-b-8 border-white' src={usuario.cover } alt="Capa do Perfil" />
                <button
                    className='absolute top-4 right-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700'
                    onClick={() => handleButtonClick(true)}
                >
                    Alterar Capa
                </button>
            </div>
            <img
                src={usuario.foto}
                alt={`Foto de perfil de ${usuario.nome}`}
                className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10'
            />

            <input
                type='file'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e, false)}
            />
            <input
                type='file'
                ref={coverInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e, true)}
            />
            <div className="relative mt-[-6rem] h-72 flex flex-col bg-sky-500 text-white text-2xl items-center justify-center z-0">
                <p>Nome: {usuario.nome}</p>
                <p>Email: {usuario.usuario}</p>
              
               

            </div>
            <button
                className='bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-700'
                onClick={() => handleButtonClick(false)}
            >
                Alterar Imagem de perfil</button>
        </div>
    );
}

export default Perfil;
