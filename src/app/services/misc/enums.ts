export enum enSesionStg {
    usuario = 'DDJ.usuario',
    claveTmp = 'DDJ.claveTmp',
    isLoggedIn = 'DDJ.isLoggedIn',
    menu = 'DDJ.menu',
    confDymanica = 'DDJ.confDymanica',
}

export enum acciones {
    recordar = 'recordar',
    password = 'password',
    esPiloto = 'esPiloto'
}

export enum constantesId {
    personaId = 'personaId',
    usuarioId = 'usuarioId',
    pilotoId = 'pilotoId',
    ubicacionPilotoId = 'ubicacionPilotoId'
}

export enum constantesDatosToken {
    persona_apellidos = 'personaId',
    persona_nombre = 'usuarioId',
    persona_telefono = 'pilotoId',
    email = 'email',
    exp = 'exp',
    token = 'token',
    token_decode = 'token_decode'
}

export enum enCRUD {
    Crear = '1',
    Leer = '2',
    Actualizar = '3',
    Eliminar = '4',
}

export enum enRsCode {
    ok = 1,
    error = -1
}

export enum enParaValor {
    TipoDocumento = 1,
    TipoCanalRadicacion = 4,
    TipoEstadosPQRS = 5,
    TipoRuta = 7,
    TipoProductor = 6,
    TipoVehiculos = 10,
    TipoIndicadorCumplimiento = 11,
    TipoPQRSWEB = 2,
    TipoNotificacionWEB = 3,
    TipoNotificacion = 8,
    TipoPQRS = 9,
    TipoEstadoDespacho = 12,
    TipoNovedadDespacho = 13,
    TipoFrecuencia = 14,
    ObjetosLavado = 18,
    ElementosPúblicos = 19,
    Actividades = 15,
    TipoComponentes = 16,
    TipoTurnos = 17,
    TipoReporteSeguimiento = 20,
    TipoRol = 21,
    TipoModulos = 22,
    TipoSubModulos = 23,
    Periodicidad = 24,
    TipoNotificacionCorreo = 25,
    URLSRedirect = 26,
    TipoManualAyuda = 31
}
