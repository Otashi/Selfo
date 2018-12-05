import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Pedido, Estado } from '../model/pedido';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { PedidoService } from './pedido.service';
import { Item } from '../model/item';
import { Itempedido } from '../model/itempedido';

@Injectable()
export class PedidoactualService {

  userId: string = 'vAnd1yz4a0gMBWEzy8oicnYstQN2';
  myPedido: Pedido; //El pedido que está en borrador o en proceso
  myItemsPedido: any; //Los items que tengo dentro del pedido
  myItemList: Itempedido[]; //Detalle de los items que tengo en el pedido (objeto entero)

  constructor(private db: AngularFireDatabase, private authService: AuthService, private pedidoService: PedidoService) {
    //this.userId = this.authService.getUid();
    this.myItemList = [];
    if(this.userId){
      this.checkPedidoSinAcabar();
    } else {
      //Error.
    }
  }

  //Mira si existen pedidos que no se han acabado.
  checkPedidoSinAcabar(){
    this.pedidoService.getPedidosUsuario(this.userId).subscribe(val => {
      val.forEach(pedido => {
        if(pedido.estado == Estado.Borrador || pedido.estado == Estado.EnProceso){
          this.myPedido = pedido;
          this.myPedido.key = pedido.$key;
        }
      })

      //Si hay pedido en borrador o en proceso cogemos los items(platos) que tiene
      if(this.myPedido){
        this.getItemsPedido(this.myPedido.key).subscribe(values => {
          this.myItemsPedido = values;
          this.getItems();
        });
      }
      else{ //No tiene pedidos
        this.myItemsPedido = null;
      }

    });
  }

  getPedidosUsuario(userid:string){
    return this.db.list<Pedido>('/pedidos', ref => ref.orderByChild('idUsuario').equalTo(userid)).snapshotChanges()
    .map(val => {
          return val.map(c => ({$key: c.payload.key, ...c.payload.val()}));
        }
    );
  }

  getItemsPedido(idPedido: string){
    return this.db.list('/pedidoitem/' + idPedido).snapshotChanges()
    .map(val => {
      return val.map( c => ({$key: c.payload.key, ...c.payload.val()}));
    });
  }

  //Por cada item que hay en el pedido, nos guardamos el item
  getItems(){
    this.myItemList.splice(0, this.myItemList.length);
    this.myItemsPedido.forEach(item =>{
      this.db.object<Item>('/items/' + item.$key).valueChanges().subscribe( value =>{
        var itemcantidad: Itempedido = new Itempedido();
        itemcantidad.item = value;
        itemcantidad.item.key = item.$key;
        itemcantidad.cantidad = item.cantidad;
        this.myItemList.push(itemcantidad);
        //console.log(value);
      });
    })
  }

  deleteItemPedido(nuevoArray: Itempedido[], idItemABorrar: string){
    this.myItemsPedido = nuevoArray;
    this.db.object('/pedidoitem/' + this.myPedido.key + '/' + idItemABorrar).remove();
  }

  addItemPedido(idItem: string, cantidad: number){
    this.myItemList.forEach(val=>{
      if(val.item.key == idItem){
        cantidad = val.cantidad + cantidad;
      }
    })
    this.db.object('/pedidoitem/' + this.myPedido.key + '/' + idItem).update({
      cantidad: cantidad
    });
  }
}
