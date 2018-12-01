import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { Item, Categoria } from '../../model/item';
import { MenuService } from '../../services/menu.service'
import { RestauranteService } from '../../services/restaurante.service'
import { Observable } from 'rxjs-compat';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import {Restaurante } from '../../model/restaurante';

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
  idRestaurante: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuService,
    public restauranteService: RestauranteService, private modalController: ModalController, private menuCtrl: MenuController) {
      
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    this.idRestaurante = this.navParams.get('idRestaurante');
    //console.log(this.idRestaurante);

    this.restauranteService.getRestaurante(this.idRestaurante).subscribe(value => {
      this.miRestaurante = value;
      //console.log(this.miRestaurante);
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

}
