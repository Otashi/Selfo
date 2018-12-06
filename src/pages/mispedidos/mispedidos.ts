import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { Pedido } from '../../model/pedido';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private pedidoService: PedidoService, 
    private authService: AuthService) {
    this.pedidoService.getPedidosUsuario(this.authService.getUid()).subscribe(values=>{
      this.myPedidos.values;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MispedidosPage');
  }

}
