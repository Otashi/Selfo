import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { Item } from '../../model/item';
import { MenuService } from '../../services/menu.service'
import { RestauranteService } from '../../services/restaurante.service'
import {Restaurante } from '../../model/restaurante';
import { PedidoService } from '../../services/pedido.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Pedido, Estado } from '../../model/pedido';

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

  miRestaurante: Restaurante;
  idRestaurante: string;
  myPedido: Pedido;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuService,
    public restauranteService: RestauranteService, private modalController: ModalController, private menuCtrl: MenuController,
    private pedidoService: PedidoService, private afaService: AngularFireAuth) {

      this.myPedido = new Pedido();
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    this.idRestaurante = '0'; //Borrar
    //Recoge el valor escaneado
    //this.idRestaurante = this.navParams.get('idRestaurante');
    //console.log(this.idRestaurante);

    this.restauranteService.getRestauranteById(this.idRestaurante).subscribe(value => {
      this.miRestaurante = value;
    });

    this.menuService.getItemList(this.idRestaurante).subscribe(values => {
      this.itemList = values;
      this.entranteList = this.itemList.filter(value => value.categoria === 0);
      this.primeroList = this.itemList.filter(value => value.categoria === 1);
      this.segundoList = this.itemList.filter(value => value.categoria === 2);
      this.postreList = this.itemList.filter(value => value.categoria === 3);
      this.bebidaList = this.itemList.filter(value => value.categoria === 4);
    });

    var date = new Date();
    this.myPedido.fecha = date.toLocaleDateString();
    console.log(this.myPedido.fecha);
    this.myPedido.estado = Estado.Borrador;
    this.myPedido.idRestaurante = this.idRestaurante;
    this.myPedido.idUser = "lol";//this.afaService.auth.currentUser.uid;
    this.myPedido.mesa = "99";
    this.pedidoService.createPedido(this.myPedido);
  }

  ionViewWillEnter() {

  }

}
