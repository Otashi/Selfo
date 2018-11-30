import { Component, Input } from '@angular/core';
import { Item, Categoria } from '../../model/item';

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

  constructor() {
    console.log('Hello PlatosListComponent Component');
    console.log(this.lista);
  }

}