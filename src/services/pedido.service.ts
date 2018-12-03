import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';
import { Pedido, Estado } from '../model/pedido';
import { UserService } from '../services/user.sercive';
import { RestauranteService } from '../services/restaurante.service';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { isDifferent } from '@angular/core/src/render3/util';

@Injectable()
export class PedidoService {

  constructor(private db: AngularFireDatabase) {
  }

  createPedido(pedido: Pedido) {

    var date = new Date();
    console.log(date.toLocaleDateString());

    this.db.object('/pedidos').update(pedido);
    /*this.db.list('/items').valueChanges().subscribe((datas) => {
      console.log("datas", datas)
      this.itemList = datas;
    },(err)=>{
        console.log("probleme : ", err)
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
