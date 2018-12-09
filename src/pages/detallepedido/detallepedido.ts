import { Component, AfterContentChecked } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController, AlertController } from 'ionic-angular';
import { Restaurante } from '../../model/restaurante';
import { PedidoactualService } from '../../services/pedidoactual.service';
import { Itempedido } from '../../model/itempedido';
import { Pedido, Estado } from '../../model/pedido';
import { myAlert } from '../../utils/helper';
import { Item } from '../../model/item';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from '../../services/pedido.service';

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
export class DetallepedidoPage implements AfterContentChecked{

  myItemsPedido: any;
  myRestaurante: Restaurante;
  myPedido: Pedido;
  paginaIniciadora: string;
  total: number = 0;
  myItemList: Itempedido[];
  itemDetaill: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private pedidoactualService: PedidoactualService,
    private toasController: ToastController, private alertController: AlertController, private auth: AuthService, private pedidoService: PedidoService) {
      this.myItemList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallepedidoPage');
    this.myRestaurante = this.navParams.get('restaurante');
    this.paginaIniciadora = this.navParams.get('paginaIniciadora');
    this.myPedido = this.navParams.get('pedido');
    console.log(this.myPedido);
    if(this.myPedido.key){
      /* this.getItemsPerPedido();
      this.calcularTotal(); */
      console.log(this.myPedido.key);
      this.pedidoactualService.getAllItemsPedido(this.myPedido.key)
      .subscribe( values => {
        console.log("Actualizo la lista de pedidos");
        this.myItemList = values;
        if(this.myItemList.length == 0) //No hay items en el pedido. Borrar el pedido
        {
          this.deletePedido();
        }
      });
      
    } else {
      myAlert("No tiene pedido activo en este restaurante", "Información", this.alertController);
    }
  }

  cerrarModal(){
    this.view.dismiss();
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad DetallepedidoPage');
    
  }

  ngAfterContentChecked(){
    this.calcularTotal();
    //this.actualizarPrecioPedido();
  }

  borrarItem(item: Itempedido){
    //console.log(this.myItemList[index]);
    //console.log(this.myPedido.key + '- '+ item.itemKey);
    this.pedidoactualService.deleteItemPedido(this.myPedido.key, item.itemKey);
    this.mostrarToast("Plato eliminado de tu pedido");
    this.calcularTotal();
  }

  mostrarToast(mensaje: string){
    let toast = this.toasController.create({
      message: mensaje,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  actualizarPrecioPedido(){
    //console.log(this.myRestaurante.key + ' - ' + this.myPedido.key + ' - ' + this.total);
    this.pedidoService.actualizarPrecioPedido(this.auth.getUid(), this.myRestaurante.key, this.myPedido.key, this.total);
  }

  calcularTotal(){
    this.total = 0;
    if(this.myItemList !== undefined) {
      this.total = this.myItemList.reduce((acumulado, valor) => 
        valor.item !== undefined ? acumulado + (valor.item.precio * valor.cantidad) : 0, 0);
        //this.actualizarPrecioPedido();
    }
  }
  deletePedido(){
    this.pedidoService.deletePedido(this.auth.getUid(), this.myPedido.key, this.myPedido.idRestaurante);
  }
}
