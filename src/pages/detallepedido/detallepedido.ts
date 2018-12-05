import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Restaurante } from '../../model/restaurante';
import { PedidoactualService } from '../../services/pedidoactual.service';
import { Itempedido } from '../../model/itempedido';

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

  myItemsPedido: Itempedido[];
  myRestaurante: Restaurante;
  total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private pedidoactualService: PedidoactualService) {
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
    this.calcularTotal()
  }

  calcularTotal(){
    this.myItemsPedido.forEach(val=>{
      this.total = this.total + val.cantidad * parseFloat(val.item.precio);
    })
  }

  borrarItem(index: number){
    console.log(index);
    this.myItemsPedido.splice(index,1);
    this.total = 0;
    this.calcularTotal();
  }

}
