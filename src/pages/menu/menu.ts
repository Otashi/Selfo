import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../model/item';
import { MenuService } from '../../services/menu.service'
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  itemList: any;
  myItem : Item = {
    key: '',
    categoria: '',
    precio: '',
    titulo: '',
    descripcion: '',
    idRestaurante: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuServ: MenuService) {

    /*this.itemList = this.menuServ.getMenuList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });*/

      this.getItemList();

      this.myItem.key = '6';
      this.myItem.categoria = 'Lol';
      this.myItem.descripcion = 'Lol';
      this.myItem.idRestaurante = 'Lol';
      this.myItem.precio = '69';
      this.myItem.titulo = 'Lol';

      console.log(this.myItem);
      menuServ.removeNote(this.myItem);

     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


  getItemList() {
    // Use snapshotChanges().map() to store the key
    this.menuServ.getMenuList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(items => {
      console.log(items);
      this.itemList = items;
    });
  }

}
