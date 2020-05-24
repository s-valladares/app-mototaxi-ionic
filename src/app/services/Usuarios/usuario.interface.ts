import { IPersonas, Personas } from '../Personas/personas.interface';

export interface IUsuarioRs {
    size: number;
    rows: IUsuario[];
}

export interface IUsuario {
    id: string;
    persona: IPersonas;
    email?: string;
    password: string;
    recordar?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export class Usuario {
    static empty() {
        return {
            id: '',
            persona: Personas.empty(),
            email: '',
            password: '',
            recordar: false,
            createdAt: '',
            updatedAt: ''
        };
    }
}
