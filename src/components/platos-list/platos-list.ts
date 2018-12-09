import { Component, Input } from '@angular/core';
import { Item } from '../../model/item';
import { ModalController } from 'ionic-angular';
import { Pedido } from '../../model/pedido';

/**
 * Generated class for the PlatosListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'platos-list',
  templateUrl: 'platos-list.html'
})
export class PlatosListComponent {
  @Input() lista: Item[];
  @Input() titulo: string;
  @Input() myPedido: Pedido;

  constructor(private modal: ModalController) {
  }

  openModal(myData:Item){
    const myModal = this.modal.create('DetalleitemPage', {item: myData, idPedido: this.myPedido});
    myModal.present();
  }
}
