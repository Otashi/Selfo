import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  providers: [QRScanner],
  exports: [HomePage]
})
export class HomePageModule {}
