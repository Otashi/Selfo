import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';
import { Pedido, Estado } from '../model/pedido';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class PedidoService {

  constructor(private db: AngularFireDatabase) {
  }

  createPedido(pedido: Pedido, idUsuario: string,  key: string) {

    this.db.object('/pedidosporusuario/' + idUsuario + '/' +key).update(pedido);
    /*this.db.list('/items').valueChanges().subscribe((datas) => {
      console.log("datas", datas)
      this.itemList = datas;
    },(err)=>{
        console.log("probleme : ", err)
    });*/

  }
  deletePedido(idUsuario: string, idPedido: string, idRestaurante: string){
    this.db.object('/pedidosporusuario/' + idUsuario + '/' + idPedido).remove();
    this.db.object('/pedidos/' + idUsuario + '/' + idRestaurante + '/' + idPedido).remove();
  }
  getPedidosUsuario(userid:string){
    return this.db.list<Pedido>('/pedidosporusuario/' + userid).snapshotChanges()
    .map(val => {
          return val.map(c => ({key: c.payload.key, ...c.payload.val()}));
        }
    );
  }

  getItemsPedido(idPedido: string){
    return this.db.list('/pedidoitem/' + idPedido).snapshotChanges()
    .map(val => {
      return val.map( c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  actualizarPrecioPedido(idUsuario: string, idRestaurante: string, idPedido: string, precio: number){
    this.db.object('pedidos/' + idUsuario + '/' + idRestaurante + '/' + idPedido).update({
      total: precio
    });

    this.db.object('pedidosporusuario/' + idUsuario  + '/' + idPedido).update({
      total: precio
    })
  }

  cambiarEstado(idUsuario: string, idPedido: string, idRestaurante:string, estado: number){
    this.db.object('pedidos/' + idUsuario + '/' + idRestaurante + '/' + idPedido).update({
      estado: estado
    });

    this.db.object('pedidosporusuario/' + idUsuario  + '/' + idPedido).update({
      estado: estado
    })
  }
    /*
    addNote(note: Item) {
        //return this.itemListRef.pus
        console.log(note);
        this.db.object('items/' + note.key + '/').update({
          titulo: note.titulo,
          categoria: note.categoria,
          precio: note.precio,
        });
    }

    updateNote(note: Item) {
        return this.itemListRef.update(note.precio, note);
    }

    removeNote(note: Item) {
        return this.itemListRef.remove(note.key);
    }

    getMenuList(): AngularFireList<Item> {
      return this.itemListRef;
    }*/
}
