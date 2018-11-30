export class Item {

  key: string
  titulo: string;
  descripcion: string;
  idRestaurante: string;
  categoria: number;
  precio: string

  constructor (key: string, titulo: string, descripcion: string, idRestaurante: string, categoria: number, precio: string){
      this.key = key;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.idRestaurante = idRestaurante;
      this.categoria = categoria;
      this.precio = precio;
  }
}

export enum Categoria {
  Entrante = 0,
  Primero = 1,
  Segundo = 2,
  Postre = 3,
  Bebida = 4
}
