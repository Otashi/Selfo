import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, Nav, ToastController } from 'ionic-angular';
import { Item } from '../../model/item';
import { PedidoactualService } from '../../services/pedidoactual.service';
import { Pedido, Estado } from '../../model/pedido';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from '../../services/pedido.service';

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
  myPedido: Pedido;
  cantidadItem: number;
  idNewPedido: string;
  idPedido: string;
  constructor(public view: ViewController, public navParams: NavParams, private pedidoactualService: PedidoactualService,
    private auth: AuthService, private toastController: ToastController, private pedidoService: PedidoService) {
  }

  ionViewDidLoad(){
  }

  ionViewWillLoad() {
    this.myItem = this.navParams.get('item');
    this.myPedido = this.navParams.get('idPedido');
    console.log(this.myItem.idRestaurante);
    if(this.myPedido){
      this.idPedido = this.myPedido.key;
      this.getMismoItemFromPedido();
    }
    else {
      this.myPedido = new Pedido();
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
    if(this.myPedido.key)
    {
      if(this.cantidadItem){
        this.cantidadItem = this.cantidadItem + this.cantidad;
        //console.log(this.cantidadItem);
      }
      else{
        this.cantidadItem = this.cantidad;
      }
      this.pedidoactualService.addItemPedido(this.myItem.key, this.cantidadItem, this.idPedido);
      this.pedidoService.actualizarPrecioPedido(this.auth.getUid(), this.myPedido.idRestaurante, this.myPedido.key, this.calcularTotal());
    } else {
      //Crear pedido
      this.createPedido();
      this.pedidoactualService.addItemPedido(this.myItem.key, this.cantidad, this.idPedido);
    }
    this.mostrarToast("Plato añadido a tu pedido");
    //TODO hay que actualizar el precio.
    this.cerrarModal();
  }

  getMismoItemFromPedido(){
    this.pedidoactualService.getNumeroItemsPorPedido(this.idPedido, this.myItem.key).subscribe(values => {
      this.cantidadItem = values;
    });
    // console.log(mismoItem);
  }

  createPedido(){
    var date = new Date();
    this.myPedido.fecha = date.toLocaleDateString();
    this.myPedido.estado = Estado.Borrador;
    this.myPedido.idRestaurante = this.myItem.idRestaurante;
    this.myPedido.mesa = "99";
    this.myPedido.total = this.calcularTotal();
    this.idPedido = this.pedidoactualService.createPedido(this.auth.getUid(), this.myItem.idRestaurante, this.myPedido);
    this.pedidoService.createPedido(this.myPedido, this.auth.getUid(), this.idPedido);

  }

  mostrarToast(mensaje: string){
    let toast = this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'bot'
    });
    toast.present();
  }

  calcularTotal(): number{
    if(this.myPedido.key){//Pedido existente y sumar el item al total
      return this.myPedido.total + this.myItem.precio * this.cantidad;
    } else {//Pedido nuevo, entonces solo añadir el item actual al total
      return this.myItem.precio*this.cantidad;
    }
  }
}
