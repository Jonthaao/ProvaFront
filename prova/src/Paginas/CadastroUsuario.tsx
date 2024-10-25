import { useForm, useFieldArray } from 'react-hook-form';
import { CriarUsuario } from '../Servicos/CriarUsuarioAPI';
import './CadastroUsuario.css'

const UserForm = () => {
    const { register, handleSubmit, control } = useForm()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "lstAddresses"  // Ajustando o nome para coincidir com o JSON esperado
    });

    const onSubmit = async (data: any) => {
        // Ajusta a estrutura para o campo tipoPerfil
        data.tipoPerfil = {
            tipo: data.tipoPerfil,  // Aqui estamos assumindo que o campo tipoPerfil seja um string simples
            nivelAcesso: data.nivelAcesso
        };

        console.log(data);
        try {
            await CriarUsuario(data);
            console.log('Usuário criado com sucesso');
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }        
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Cadastro de Usuário</h2>
                <div>
                    <label>Nome: </label>
                    <input type="text" {...register("name")} required />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" {...register("email")} required />
                </div>
                <div>
                    <label>Senha: </label>
                    <input type="password" {...register("senha")} required />
                </div>
                <div>
                    <label>Foto: </label>
                    <input type="text" {...register("foto")} />
                </div>
                
                <div>
                    <label>Perfil: </label>
                    <div>
                        <label>
                            <input type="radio" value="admin" {...register("tipoPerfil")} />
                            Admin
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="user" {...register("tipoPerfil")} />
                            User
                        </label>
                    </div>
                </div>

                <div>
                    <label>Nível de Acesso: </label>
                    <div>
                        <label>
                            <input type="radio" value="high" {...register("nivelAcesso")} />
                            Alto
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="medium" {...register("nivelAcesso")} />
                            Médio
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="low" {...register("nivelAcesso")} />
                            Baixo
                        </label>
                    </div>
                </div>

                <div>
                    <label>Unidade: </label>
                    <input type="text" {...register("unidade")} />
                </div>

                <h2>Endereços</h2>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <div>
                            <label>Rua: </label>
                            <input type="text" {...register(`lstAddresses[${index}].street`)} required />
                        </div>
                        <div>
                            <label>Número: </label>
                            <input type="text" {...register(`lstAddresses[${index}].number`)} required />
                        </div>
                        <div>
                            <label>Complemento: </label>
                            <input type="text" {...register(`lstAddresses[${index}].complement`)} />
                        </div>
                        <div>
                            <label>Distrito: </label>
                            <input type="text" {...register(`lstAddresses[${index}].district`)} required />
                        </div>
                        <div>
                            <label>Vizinhança: </label>
                            <input type="text" {...register(`lstAddresses[${index}].neighborhood`)} required />
                        </div>
                        <div>
                            <label>Cidade: </label>
                            <input type="text" {...register(`lstAddresses[${index}].city`)} required />
                        </div>
                        <div>
                            <label>Estado: </label>
                            <input type="text" {...register(`lstAddresses[${index}].state`)} required />
                        </div>
                        <div>
                            <label>País: </label>
                            <input type="text" {...register(`lstAddresses[${index}].country`)} required />
                        </div>
                        <div>
                            <label>CEP: </label>
                            <input type="text" {...register(`lstAddresses[${index}].zipCode`)} required />
                        </div>
                        <button type="button" onClick={() => remove(index)}>Remover Endereço</button>
                    </div>
                ))}
                <button type="button" onClick={() => append({})}>Adicionar Endereço</button>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
};

export default UserForm;
