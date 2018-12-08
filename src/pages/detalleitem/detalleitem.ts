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
  idPedido: string;
  cantidadItem: number;
  constructor(public view: ViewController, public navParams: NavParams, private pedidoactualService: PedidoactualService) {
  }

  ionViewDidLoad(){
  }

  ionViewWillLoad() {
    this.myItem = this.navParams.get('item');
    this.idPedido = this.navParams.get('idPedido');
    console.log(this.myItem.key);
    this.getMismoItemFromPedido();
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
    if(this.cantidadItem){
      this.cantidadItem = this.cantidadItem + this.cantidad;
      console.log(this.cantidadItem);
    }
    else{
      this.cantidadItem = this.cantidad;
    } 
    this.pedidoactualService.addItemPedido(this.myItem.key, this.cantidadItem, this.idPedido);
    this.cerrarModal();
  }

  getMismoItemFromPedido(){
    this.pedidoactualService.getNumeroItemsPorPedido(this.idPedido, this.myItem.key).subscribe(values => {
      this.cantidadItem = values;
    });
    // console.log(mismoItem);
  }
}
