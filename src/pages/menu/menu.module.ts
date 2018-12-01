import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';
import { MenuService } from '../../services/menu.service';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MenuPage),
  ],
})
export class MenuPageModule {}
