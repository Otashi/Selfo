import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, Nav } from 'ionic-angular';
import { Item } from '../../model/item';
import { WheelSelector } from '@ionic-native/wheel-selector';

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
  options : any;
  cantidad: number = 1;
  constructor(public view: ViewController, public navParams: NavParams, private selector: WheelSelector) {

    var data = {
      numbers: [
          {description: "1"},
          {description: "2"},
          {description: "3"},
          {description: "4"},
          {description: "5"},
          {description: "6"},
          {description: "7"},
          {description: "8"},
          {description: "9"},
          {description: "10"}
      ]};

      this.options = {
        title: "Selecciona cantidad",
        items:[
            [data.numbers]
        ],
        positiveButtonText: "Aceptar",
        negativeButtonText: "Cancelar"
    };
    
  }

  ionViewWillLoad() {
    this.myItem = this.navParams.get('item');
  }

  cerrarModal(){
    this.view.dismiss();
  }

  /*openWheel(){
    console.log("WHEEEL");
    this.selector.show(this.options).then(
      res => {console.log(res)},
      error => {console.log(error)}
    )
  }*/

  quitarCantidad(){
    if(this.cantidad > 1){
       this.cantidad = this.cantidad - 1;
    }
  }

  anadirCantidad(){
    this.cantidad = this.cantidad + 1;
  }

}
