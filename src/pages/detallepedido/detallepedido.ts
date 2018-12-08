import { Component, AfterContentChecked } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController } from 'ionic-angular';
import { Restaurante } from '../../model/restaurante';
import { PedidoactualService } from '../../services/pedidoactual.service';
import { Itempedido } from '../../model/itempedido';
import { Pedido, Estado } from '../../model/pedido';
import { Item } from '../../model/item';

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
    private toasController: ToastController) {
      this.myItemList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallepedidoPage');
    this.myRestaurante = this.navParams.get('restaurante');
    this.paginaIniciadora = this.navParams.get('paginaIniciadora');
    this.myPedido = this.navParams.get('pedido');

    if(this.myPedido){
      /* this.getItemsPerPedido();
      this.calcularTotal(); */
      this.pedidoactualService.getAllItemsPedido(this.myPedido.key)
      .subscribe( values => {
        this.myItemList = values;
      });
      
    } else {
      //Crear pedido
    }
  }

  cerrarModal(){
    this.view.dismiss();
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad DetallepedidoPage');
    
  }

  getItemsPerPedido(){
    this.pedidoactualService.getItemsPedido(this.myPedido.key).subscribe(values => {
      this.myItemsPedido = values;
      this.myItemsPedido.forEach(element => {
        var myItemPedido: Itempedido = new Itempedido();
        this.pedidoactualService.getDetailItemFromPedido(element.key).subscribe(value =>{
            myItemPedido.item = value;
            myItemPedido.item.key = element.key;
            myItemPedido.cantidad = element.cantidad;
            this.myItemList.push(myItemPedido);
        })
      });
  })
} 

  ngAfterContentChecked(){
    this.total = 0;
    if(this.myItemList !== undefined) {
      this.total = this.myItemList.reduce((acumulado, valor) => 
        valor.item !== undefined ? acumulado + (parseFloat(valor.item.precio) * valor.cantidad) : 0, 0);
    }
  }

  borrarItem(item: Itempedido){
    // console.log(this.myItemList[index]);
    // this.myItemList.splice(index,1);
    //console.log(this.myPedido.key + '- '+ item.itemKey);
    this.pedidoactualService.deleteItemPedido(this.myPedido.key, item.itemKey);
    this.mostrarToast("Plato eliminado de tu pedido");
    //this.pedidoactualService.actualizarPrecioPedido(this.total);
  }

  mostrarToast(mensaje: string){
    let toast = this.toasController.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
