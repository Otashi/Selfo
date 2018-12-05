import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { MenuService } from '../../services/menu.service';
import { Restaurante } from '../../model/restaurante';

/**
 * Generated class for the DetallepedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detallepedido',
  templateUrl: 'detallepedido.html',
})
export class DetallepedidoPage {

  myItemsPedido: any;
  myRestaurante: Restaurante;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private menuService: MenuService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallepedidoPage');
  }

  cerrarModal(){
    this.view.dismiss();
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad DetallepedidoPage');
    this.myItemsPedido = this.navParams.get('platos');
    this.myRestaurante = this.navParams.get('restaurante');
    console.log(this.myItemsPedido);
  }

}
