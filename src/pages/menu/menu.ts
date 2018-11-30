import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  entranteTitulo: string;
  primeroTitulo: string = "Primeros";
  segundoTitulo: string = "Segundos";
  postreTitulo: string = "Postres";
  bebidaTitulo: string = "Bebidas";

  public miRestaurante: Restaurante;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuService,
    public restauranteService: RestauranteService) {

      this.entranteTitulo = "Entrantes";

      restauranteService.getRestaurante().subscribe(value => {
        console.log(value.fotoRestaurante);
        this.miRestaurante = value;
        console.log(this.miRestaurante);
      });

      menuService.getItemList().subscribe(values => {
        this.itemList = values;
        this.entranteList = this.itemList.filter(value => value.categoria === 0);
        this.primeroList = this.itemList.filter(value => value.categoria === 1);
        this.segundoList = this.itemList.filter(value => value.categoria === 2);
        this.postreList = this.itemList.filter(value => value.categoria === 3);
        this.bebidaList = this.itemList.filter(value => value.categoria === 4);

      });
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
