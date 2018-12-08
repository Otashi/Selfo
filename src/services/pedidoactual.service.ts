import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Pedido, Estado } from '../model/pedido';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { PedidoService } from './pedido.service';
import { Item } from '../model/item';
import { Itempedido } from '../model/itempedido';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { FabButton } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class PedidoactualService {

  userId: string ;//= 'vAnd1yz4a0gMBWEzy8oicnYstQN2';
  myPedido: Pedido; //El pedido que está en borrador o en proceso
  myItemsPedido: any; //Los items que tengo dentro del pedido
  myItemList: Itempedido[]; //Detalle de los items que tengo en el pedido (objeto entero) con su canatidad

  constructor(private db: AngularFireDatabase, private afaService: AngularFireAuth,
    private fb: FirebaseApp, private pedidoService: PedidoService) {
    this.myItemList = [];
  }

  //Mira si existen pedidos que no se han acabado.
  checkPedidoSinAcabar(idRestaurante: string) : Observable<{}>{
    //console.log("CHECK PEDIDO!!!!!!!!!!!");
    this.userId = this.afaService.auth.currentUser.uid;
    return this.db.list('pedidos/' + this.userId + '/' + idRestaurante, ref => ref.orderByChild('estado').equalTo(0)).snapshotChanges()
    .map(val=>{
      return val.map(c => ({key: c.payload.key, ...c.payload.val()}))
    });
  }

  getAllItemsPedido(idPedido: string): Observable<Itempedido[]> {
    return this.db.list('pedidoitem/' + idPedido).snapshotChanges().pipe(
      tap(console.log)
    )
    .map(values => {
      return values.map( c => {
        // console.log(c.payload.val());
        const itemPedido = c.payload.val() as Itempedido;
        itemPedido.itemKey = c.payload.key;
        this.fb.database().ref('items/' + itemPedido.itemKey).once('value').then(function(snap) {
          itemPedido.item = snap.val();
        });
        return itemPedido;
      });
    });
  }

  getDetailItemFromPedido(idItem: string){
    return this.db.object<Item>('/items/' + idItem).valueChanges();
  }

  deleteItemPedido(idPedido: string, idItemABorrar: string){
    this.db.object('/pedidoitem/' + idPedido + '/' + idItemABorrar).remove();
  }

  getNumeroItemsPorPedido(idPedido: string, idItem: string){
    console.log(idPedido);
    console.log(idItem);
    return this.db.list('pedidoitem/' + idPedido + '/' + idItem, ref => ref.orderByKey().equalTo('cantidad'))
    .snapshotChanges().pipe(
      tap(console.log),
      map(values => {return values.map(v => v.payload.val());}),
      map(values => values[0])
    );
  }

  addItemPedido(idItem: string, cantidad: number, idPedido: string){
    this.db.object('/pedidoitem/' + idPedido + '/' + idItem).update({
      cantidad: cantidad
    });
  }

  actualizarPrecioPedido(precio: number){
    this.db.object('/pedidos/' + this.myPedido.key).update({
      total: precio
    });
  }

  createPedido(idUser: string, idRestaurante: string, pedido: Pedido){
    const key = this.db.createPushId();
    this.db.object('/pedidos/' + idUser + '/' + idRestaurante + '/' + key).update(pedido);
    return key;
  }

  getCantidadItemsPorPedido(idPedido: string){
    return this.db.list('pedidoitem/' + idPedido).snapshotChanges();
  }
}
