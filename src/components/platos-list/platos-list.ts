import { Component, Input } from '@angular/core';
import { Item, Categoria } from '../../model/item';
import { ModalController } from 'ionic-angular';

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
  @Input() idPedido: string;

  constructor(private modal: ModalController) {
  }

  openModal(myData:Item){
    const myModal = this.modal.create('DetalleitemPage', {item: myData, idPedido: this.idPedido});
    myModal.present();
  }
}
