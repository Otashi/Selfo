import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, Nav } from 'ionic-angular';
import { Item } from '../../model/item';
import { PedidoactualService } from '../../services/pedidoactual.service';

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
  options : any;
  cantidad: number = 1;
  constructor(public view: ViewController, public navParams: NavParams, private pedidoactualService: PedidoactualService) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad MenuPage');
    if(this.pedidoactualService.myItemsPedido == null){
      console.log("NO TENGO PEDIDOS");
      //CREAR PEDIDO
    }
    else{
      console.log("Tengo pedidooooooo");
    }
  }

  ionViewWillLoad() {
    this.myItem = this.navParams.get('item');
    //this.myItem.key = this.navParams.get('item').$key;
  }

  cerrarModal(){
    this.view.dismiss();
  }

  quitarCantidad(){
    if(this.cantidad > 1){
       this.cantidad = this.cantidad - 1;
    }
  }

  anadirCantidad(){
    this.cantidad = this.cantidad + 1;
  }

  anadirItemAPedido(){
    console.log(this.myItem.key);
    this.pedidoactualService.addItemPedido(this.myItem.key, this.cantidad);
    this.cerrarModal();
  }
}
