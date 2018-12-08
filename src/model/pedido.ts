export class Pedido {

    key: string
    mesa: string;
    fecha: string;
    estado: number;
    total: string;

    constructor (){

    }

    /*constructor (key: string, idUser: string, idRestaurante: string, mesa: string, estado: number){
        this.key = key;
        this.idUser = idUser;
        this.idRestaurante = idRestaurante;
        this.mesa = mesa;
        this.estado = estado;
    }*/
  }

export enum Estado {
  Borrador = 0,
  EnProceso = 1,
  Finalizado = 2,
}

