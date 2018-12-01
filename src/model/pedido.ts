export class Restaurante {

    key: string
    idUser: string;
    idRestaurante: string;
    nombre: string;
    telefono: string;
  
    constructor (key: string, direccion: string, fotoRestaurante: string, nombre: string, telefono: string){
        this.key = key;
        //this.direccion = direccion;
       // this.fotoRestaurante = fotoRestaurante;
        this.nombre = nombre;
        this.telefono = telefono;
    }
  }
  