import { NgModule } from '@angular/core';
import { PlatosListComponent } from './platos-list/platos-list';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [PlatosListComponent],
	imports: [IonicModule],
	exports: [PlatosListComponent]
})
export class ComponentsModule {}
