import { IUsuario, Usuario } from '../Usuarios/usuario.interface';

export interface IUbicacionesRs {
    size: number;
    rows: IUbicaciones[];
}

export interface IUbicaciones {
    id: string;
    usuario: IUsuario;
    latitud?: string;
    longitud: string;
    createdAt: string;
    updatedAt: string;
}

export class Ubicaciones {
    static empty() {
        return {
            id: '',
            usuario: Usuario.empty(),
            latitud: '',
            longitud: '',
            createdAt: '',
            updatedAt: ''
        };
    }
}

