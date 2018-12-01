import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, Nav } from 'ionic-angular';
import { Item } from '../../model/item';

/**
 * Generated class for the DetalleitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalleitem',
  templateUrl: 'detalleitem.html',
})
export class DetalleitemPage {

  myItem : Item;
  constructor(public view: ViewController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.myItem = this.navParams.get('item');
  }

  cerrarModal(){
    this.view.dismiss();
  }

}
