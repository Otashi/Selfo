import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';
import { Restaurante } from '../model/restaurante';

@Injectable()
export class RestauranteService {

  private rest: Observable<Restaurante>;

  constructor(private db: AngularFireDatabase) {
  }

  getRestauranteById(idRestaurante: string) {
    this.rest = this.db.object<Restaurante>('/restaurantes/'+ idRestaurante).valueChanges();
    return this.rest;
    /*this.db.list('/items').valueChanges().subscribe((datas) => {
      console.log("datas", datas)
      this.itemList = datas;
    },(err)=>{
        console.log("probleme : ", err)
    });*/

  }

  getRestaurante(){
    return this.rest;
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
