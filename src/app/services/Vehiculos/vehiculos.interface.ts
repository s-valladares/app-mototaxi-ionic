import { IUsuario, Usuario } from '../Usuarios/usuario.interface';
import { IPilotos, Pilotos } from '../Pilotos/pilotos.interface';

export interface IVehiculosRs {
    size: number;
    rows: IVehiculos[];
}

export interface IVehiculos {
    id: string;
    usuario: IUsuario;
    color?: string;
    modelo: string;
    placa: string;
    piloto: IPilotos;
    createdAt?: string;
    updatedAt?: string;
}

export class Vehiculos {
    static empty() {
        return {
            id: '',
            usuario: Usuario.empty(),
            color: '',
            modelo: '',
            placa: '',
            piloto: Pilotos.empty(),
            createdAt: '',
            updatedAt: ''
        };
    }
}



