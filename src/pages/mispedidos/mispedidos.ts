import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { Pedido, Estado } from '../../model/pedido';
import { RestauranteService } from '../../services/restaurante.service';
import { Restaurante } from '../../model/restaurante';
import { tap, map } from 'rxjs/operators';

/**
 * Generated class for the MispedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mispedidos',
  templateUrl: 'mispedidos.html',
})
export class MispedidosPage {

  myPedidos: Pedido[];
  mapRestaurante: Map<string, Restaurante>;
  myRestaurante: Restaurante;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pedidoService: PedidoService,
    private authService: AuthService, private restauranteService: RestauranteService, private modalController: ModalController) {
      this.mapRestaurante = new Map<string, Restaurante>();
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad MispedidosPage');
    this.pedidoService.getPedidosUsuario(this.authService.getUid()).subscribe(values=>{
      this.myPedidos = values;
      this.myPedidos.forEach(pedido => {
        console.log(pedido);
        this.restauranteService.getRestauranteById(pedido.idRestaurante).subscribe(rest =>{
          this.mapRestaurante.set(pedido.idRestaurante, rest);
        })
      })
    });
  }

  getFotoRestauranteById(idRestaurante: string){
    if(this.mapRestaurante.get(idRestaurante)){
      return this.mapRestaurante.get(idRestaurante).fotoRestaurante;
    }
  }
  getNombreRestauranteById(idRestaurante: string){
    if(this.mapRestaurante.get(idRestaurante)){
      return this.mapRestaurante.get(idRestaurante).nombre;
    }
  }

  getRestauranteById(idRestaurante: string){
    if(this.mapRestaurante.get(idRestaurante)){
      this.myRestaurante = this.mapRestaurante.get(idRestaurante);
      return this.myRestaurante;
    }
  }

  getEstadoPedido(idEstado: number){
    switch(idEstado) {
      case Estado.Borrador: {
         return "Borrador";
      }
      case Estado.EnProceso: {
         return "En Proceso";
      }
      case Estado.Finalizado: {
        return "Finalizado";
      }
      default: {
         console.log("Invalid choice");
         break;
      }
   }
  }

  openModalDetallePedido(myPedido: Pedido){
    //console.log(myPedido);
    //console.log(this.getRestauranteById(myPedido.idRestaurante));
    const myModal = this.modalController.create('DetallepedidoPage', {pedido: myPedido, restaurante: this.getRestauranteById(myPedido.idRestaurante), paginaIniciadora:'MisPedidos'});
    myModal.present();
    myModal.onDidDismiss(data => {
      if(data){
        if(data == 'cerrarView'){
          this.navCtrl.setRoot('HomePage');
        } else {
          this.navCtrl.push('MenuPage', {
            idRestaurante: data
          });
        }
      }
 });
  }
}
