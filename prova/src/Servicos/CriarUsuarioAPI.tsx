import axios from "axios";
import { Usuario } from "../Interfaces/Usuario";

const apiClient = axios.create({
    baseURL: 'https://scholarspace-254954748843.southamerica-east1.run.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const CriarUsuario = async (dadosUsuario: Usuario) => {
    try {
        const response = await apiClient.post('/User', dadosUsuario);
        console.log('Usuário criado com sucesso:', response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Captura o corpo da resposta para entender o erro
            console.error('Erro na criação do usuário:', error.response.data);
            console.log('Detalhes do erro:', error.response.data);  // Adicione isso para exibir o conteúdo exato do erro
            throw new Error(error.response.data.message || 'Erro ao criar usuário');
        } else {
            console.error('Erro na requisição:', error.message);
            throw new Error('Erro ao se conectar ao servidor');
        }
    }
};
