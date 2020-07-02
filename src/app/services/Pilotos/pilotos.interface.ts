import { IUsuario, Usuario } from '../Usuarios/usuario.interface';

export interface IPilotosRs {
    size: number;
    rows: IPilotos[];
}

export interface IPilotos {
    id: string;
    usuario: IUsuario;
    licencia?: boolean;
    activo: boolean;
    lat: string;
    lng: string;
    createdAt?: string;
    updatedAt?: string;
}

export class Pilotos {
    static empty() {
        return {
            id: '',
            usuario: Usuario.empty(),
            licencia: false,
            activo: false,
            lat: '',
            lng: '',
            createdAt: '',
            updatedAt: ''
        };
    }
}
