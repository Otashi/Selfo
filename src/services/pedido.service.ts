import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';
import { Pedido, Estado } from '../model/pedido';

@Injectable()
export class PedidoService {

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

  checkPedidoBorrador(userid:string, estado: number) : boolean{
    const pedidoBorrador = this.db.list<Pedido>('/pedidos', ref => ref.orderByChild('idUsuario').equalTo(userid)).valueChanges();
    return true;
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
