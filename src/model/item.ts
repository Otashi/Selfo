export class Item {

  key: string
  titulo: string;
  descripcion: string;
  idRestaurante: string;
  categoria: string;
  precio: string

  constructor (key: string, titulo: string, descripcion: string, idRestaurante: string, categoria: string, precio: string){
      this.key = key;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.idRestaurante = idRestaurante;
      this.categoria = categoria;
      this.precio = precio;
  }
}
