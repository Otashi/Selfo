import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Pedido, Estado } from '../model/pedido';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { PedidoService } from './pedido.service';
import { Item } from '../model/item';
import { Itempedido } from '../model/itempedido';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PedidoactualService {

  userId: string ;//= 'vAnd1yz4a0gMBWEzy8oicnYstQN2';
  myPedido: Pedido; //El pedido que está en borrador o en proceso
  myItemsPedido: any; //Los items que tengo dentro del pedido
  myItemList: Itempedido[]; //Detalle de los items que tengo en el pedido (objeto entero) con su canatidad

  constructor(private db: AngularFireDatabase, private afaService: AngularFireAuth, private pedidoService: PedidoService) {
    this.myItemList = [];
    /*this.userId = this.afaService.auth.currentUser.uid;
    if(this.userId){
      this.checkPedidoSinAcabar();
    } else {
      //Error.
    }*/
  }

  //Mira si existen pedidos que no se han acabado.
  checkPedidoSinAcabar(){
    console.log("CHECK PEDIDO!!!!!!!!!!!");
    this.userId = this.afaService.auth.currentUser.uid
    this.pedidoService.getPedidosUsuario(this.userId).subscribe(val => { //Recogo todos los pedidos del usuario
      val.forEach(pedido => {
        if(pedido.estado == Estado.Borrador || pedido.estado == Estado.EnProceso){ //Si un pedido está en borrador o en proceso lo añado a mi pedido actual
          this.myPedido = pedido;
        }
      })

      //Si hay pedido en borrador o en proceso cogemos los items(platos) que tiene
      if(this.myPedido){
        this.getItemsPedido(this.myPedido.key).subscribe(values => {
          this.myItemsPedido = values;
          console.log("Cuando tenemos los platos con su cantidad necesitamos el detalle de ese plato");
          this.getItems(); //Cuando tenemos los platos con su cantidad necesitamos el detalle de ese plato
        });

      }
      else{ //No tiene pedidos
        this.myItemsPedido = null;
      }

    });
  }

  getItemsPedido(idPedido: string){
    return this.db.list('/pedidoitem/' + idPedido).snapshotChanges()
    .map(val => {
      return val.map( c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  //Por cada item que hay en el pedido, nos guardamos el item
  getItems(){
    console.log("Busco los platos con toda la info");
    this.myItemList.splice(0, this.myItemList.length);
    this.myItemsPedido.forEach(item =>{ //Por cada plato que hay, recogemos su detalle.
      this.db.object<Item>('/items/' + item.key).valueChanges().subscribe( value =>{
        var itemcantidad: Itempedido = new Itempedido();
        itemcantidad.item = value;
        itemcantidad.item.key = item.key;
        itemcantidad.cantidad = item.cantidad;
        this.myItemList.push(itemcantidad);
        //console.log(value);
      });
    })
    this.calcularTotal();
  }

  deleteItemPedido(nuevoArray: Itempedido[], idItemABorrar: string){
    //this.myItemList = nuevoArray;
    this.db.object('/pedidoitem/' + this.myPedido.key + '/' + idItemABorrar).remove();
  }

  addItemPedido(idItem: string, cantidad: number){
    var total = cantidad;
    this.myItemList.forEach(val=>{
      if(val.item.key == idItem){
        val.cantidad = val.cantidad + cantidad;
        total = val.cantidad;
      }
    })
    this.db.object('/pedidoitem/' + this.myPedido.key + '/' + idItem).update({
      cantidad: total
    });
  }

  actualizarPrecioPedido(precio: number){
    this.db.object('/pedidos/' + this.myPedido.key).update({
      total: precio
    });
  }

  getItemList(){
    console.log(this.myItemList.length)
    return this.myItemList;
  }

  calcularTotal(){
    var total = 0;
    this.myItemList.forEach(val=>{
      total = total + val.cantidad * parseFloat(val.item.precio);
    })
    console.log("TOTAL: " + total.toString());
    this.actualizarPrecioPedido(total);
  }
}
