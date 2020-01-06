export interface IUbicacionRs {
    count: number;
    rows: IUbicacion[];
  }

export interface IUbicacion {
    id: string;
    lat: number;
    lng: number;
    marcador?: string;
}

export class Ubicacion {
    static empy() {
      return {
        id: '',
        lat: 0,
        lng: 0,
        marcador: ''
      } as IUbicacion;
    }
  }
