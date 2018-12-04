import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';
import { Pedido, Estado } from '../model/pedido';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class PedidoService {

  pedidosRef = firebase.database().ref("pedidos");

  constructor(private db: AngularFireDatabase) {
  }

  createPedido(pedido: Pedido) {

    const key = this.db.createPushId();
    this.db.object('/pedidos/' + key).update(pedido);
    /*this.db.list('/items').valueChanges().subscribe((datas) => {
      console.log("datas", datas)
      this.itemList = datas;
    },(err)=>{
        console.log("probleme : ", err)
    });*/

  }

  getPedidosUsuario(userid:string){
    return this.db.list<Pedido>('/pedidos', ref => ref.orderByChild('idUsuario').equalTo(userid)).snapshotChanges()
    .map(val => {
          return val.map(c => ({$key: c.payload.key, ...c.payload.val()}));
        }
    );
  }

  getItemsPedido(idPedido: string){
    return this.db.object('/pedidoitem/' + idPedido).valueChanges();
    /*.map(c => { ({$key: c.payload.key, ...c.payload.val()});
    });*/
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
