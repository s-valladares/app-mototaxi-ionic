import { IUsuario, Usuario } from '../Usuarios/usuario.interface';

export interface IUbicacionesRs {
    size: number;
    rows: IUbicaciones[];
}

export interface IUbicaciones {
    id: string;
    usuario: IUsuario;
    latitud?: number;
    longitud: number;
    createdAt: string;
    updatedAt: string;
}

export class Ubicaciones {
    static empty() {
        return {
            id: '',
            usuario: Usuario.empty(),
            latitud: 0.0,
            longitud: 0.0,
            createdAt: '',
            updatedAt: ''
        };
    }
}

