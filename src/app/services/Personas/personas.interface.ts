
export interface IPersonasRs {
    size: number;
    rows: IPersonas[];
}

export interface IPersonas {
    id: string;
    nombres: string;
    apellidos?: string;
    direccion: string;
    telefono: string;
    createdAt: string;
    updatedAt: string;
}

export class Personas {
    static empty() {
        return {
            id: '',
            nombres: '',
            apellidos: '',
            direccion: '',
            telefono: '',
            createdAt: '',
            updatedAt: ''
        };
    }
}

