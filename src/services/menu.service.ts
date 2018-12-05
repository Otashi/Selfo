import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Item } from '../model/item'
import { Observable } from 'rxjs-compat';

@Injectable()
export class MenuService {

  private itemList: Observable<Item[]>;

  constructor(private db: AngularFireDatabase) {

  }

  getItemList(idRestaurante: string) {
    return this.itemList = this.db.list<Item>('/items', ref => ref.orderByChild('idRestaurante').equalTo(idRestaurante)).snapshotChanges()
    .map(val =>{
      return val.map( c => ({$key: c.payload.key, ...c.payload.val()}));
    });
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
