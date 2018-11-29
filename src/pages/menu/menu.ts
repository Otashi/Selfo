import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../model/item';
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
  myItem : Item = {
    key: '',
    categoria: '',
    precio: '',
    titulo: '',
    descripcion: '',
    idRestaurante: '',
  };

  public miRestaurante: Restaurante;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuService: MenuService,
    public restauranteService: RestauranteService) {

      restauranteService.getRestaurante().subscribe(value => {
        console.log(value.fotoRestaurante);
        this.miRestaurante = value;
        console.log(this.miRestaurante);
      })

      menuService.getItemList().subscribe(values => {
        this.itemList = values;
        //this.itemList.forEach(item => console.log(item.titulo));
      })
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
