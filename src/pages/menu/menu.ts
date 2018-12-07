import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { Item } from '../../model/item';
import { MenuService } from '../../services/menu.service'
import { RestauranteService } from '../../services/restaurante.service'
import {Restaurante } from '../../model/restaurante';
import { PedidoService } from '../../services/pedido.service';
import { Pedido, Estado } from '../../model/pedido';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { PedidoactualService } from '../../services/pedidoactual.service';
import { ThrowStmt } from '@angular/compiler';


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  itemList: Item[];
  entranteList: Item[];
  primeroList: Item[];
  segundoList: Item[];
  postreList: Item[];
  bebidaList: Item[];
  entranteTitulo: string = "Entrantes";
  primeroTitulo: string = "Primeros";
  segundoTitulo: string = "Segundos";
  postreTitulo: string = "Postres";
  bebidaTitulo: string = "Bebidas";
  //myItemsPedido: {idItem: string, cantidad: number}[];
  myItemsPedido: any;

  myRestaurante: Restaurante;
  idRestaurante: string;
  myPedido: Pedido;
  pedidoBorrador: Pedido;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuService,
    public restauranteService: RestauranteService, private modalController: ModalController, private menuCtrl: MenuController,
    private pedidoService: PedidoService, private authService: AuthService, private pedidoactualService: PedidoactualService) {

      this.myPedido = new Pedido();
     }

  ionViewDidLoad() {
    console.log("CHECK PEDIDO SIN ACABAR");
    this.pedidoactualService.checkPedidoSinAcabar();
  }

  ionViewWillLoad(){
    //this.pedidoactualService.checkPedidoSinAcabar();
    this.idRestaurante = 'R0000'; //Borrar
    //Recoge el valor escaneado
    //this.idRestaurante = this.navParams.get('idRestaurante');
    //this.mesa = this.navParams.get('mesa'); //Cuando se tenga la mesa en el QR
    //console.log(this.idRestaurante);

    this.restauranteService.getRestauranteById(this.idRestaurante).subscribe(value => {
      this.myRestaurante = value;
    });

    this.menuService.getItemList(this.idRestaurante).subscribe(values => {
      this.itemList = values;
      this.entranteList = this.itemList.filter(value => value.categoria === 0);
      this.primeroList = this.itemList.filter(value => value.categoria === 1);
      this.segundoList = this.itemList.filter(value => value.categoria === 2);
      this.postreList = this.itemList.filter(value => value.categoria === 3);
      this.bebidaList = this.itemList.filter(value => value.categoria === 4);
    });
  }

  ionViewWillEnter() {
  }

  createPedido(){

    var date = new Date();
    this.myPedido.fecha = date.toLocaleDateString();
    this.myPedido.estado = Estado.Borrador;
    this.myPedido.idRestaurante = this.idRestaurante;
    this.myPedido.idUsuario = this.authService.getUid();
    this.myPedido.mesa = "99";
    this.myPedido.total = '0';
    this.pedidoService.createPedido(this.myPedido);

  }

  openModalDetallePedido(){
    const myModal = this.modalController.create('DetallepedidoPage', {platos: this.pedidoactualService.getItemList(), restaurante: this.myRestaurante, paginaIniciadora:'Menu'});
    myModal.present();
  }
}
