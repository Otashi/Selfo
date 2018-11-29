import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';
import { Restaurante } from '../model/restaurante';

@Injectable()
export class RestauranteService {

  private rest: Observable<Restaurante>;
  idRestaurante: string = '0';

  constructor(private db: AngularFireDatabase) {
    this.rest = db.object<Restaurante>('/restaurantes/'+ this.idRestaurante).valueChanges();
    console.log(this.rest);
  }

  getRestaurante() {
    return this.rest;
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
