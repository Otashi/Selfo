import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Item } from '../model/item'
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MenuService {

    itemListRef : AngularFireList<Item> = null;

    constructor(private db: AngularFireDatabase) {
      this.itemListRef = db.list('/items');
    }

    /*getMenuList() {
        return this.itemListRef;
    }*/

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
    }
}
