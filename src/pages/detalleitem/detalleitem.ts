import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, Nav, ToastController } from 'ionic-angular';
import { Item } from '../../model/item';
import { PedidoactualService } from '../../services/pedidoactual.service';
import { Pedido, Estado } from '../../model/pedido';
import { AuthService } from '../../services/auth.service';

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
  cantidad: number = 1;
  idPedido: string;
  cantidadItem: number;
  idNewPedido: string;
  constructor(public view: ViewController, public navParams: NavParams, private pedidoactualService: PedidoactualService,
    private auth: AuthService, private toastController: ToastController) {
  }

  ionViewDidLoad(){
  }

  ionViewWillLoad() {
    this.myItem = this.navParams.get('item');
    this.idPedido = this.navParams.get('idPedido');
    console.log(this.myItem.idRestaurante);
    if(this.idPedido){
      this.getMismoItemFromPedido();
    }
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
    if(this.idPedido)
    {
      if(this.cantidadItem){
        this.cantidadItem = this.cantidadItem + this.cantidad;
        console.log(this.cantidadItem);
      }
      else{
        this.cantidadItem = this.cantidad;
      } 
      this.pedidoactualService.addItemPedido(this.myItem.key, this.cantidadItem, this.idPedido);
    } else {
      //Crear pedido
      this.createPedido();
      console.log(this.idNewPedido);
      this.pedidoactualService.addItemPedido(this.myItem.key, this.cantidad, this.idNewPedido);
    }
    this.mostrarToast("Plato añadido a tu pedido");
    this.cerrarModal();
  }

  getMismoItemFromPedido(){
    this.pedidoactualService.getNumeroItemsPorPedido(this.idPedido, this.myItem.key).subscribe(values => {
      this.cantidadItem = values;
    });
    // console.log(mismoItem);
  }

  createPedido(){
    var newPedido = new Pedido();
    var date = new Date();
    newPedido.fecha = date.toLocaleDateString();
    newPedido.estado = Estado.Borrador;
    newPedido.mesa = "99";
    newPedido.total = '0';
    this.idNewPedido = this.pedidoactualService.createPedido(this.auth.getUid(), this.myItem.idRestaurante, newPedido);

  }

  mostrarToast(mensaje: string){
    let toast = this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'bot'
    });
    toast.present();
  }
}
