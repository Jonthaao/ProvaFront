import { lstAddresses } from "./Endereco";
import { tipoPerfil } from "./Perfil";



export interface Usuario{  
        name: string ,
        email: string,
        senha: string,
        foto: string,
        tipoPerfil: tipoPerfil | null,
        lstAddresses: Array<lstAddresses> | null,
        unidade: string
        }
        