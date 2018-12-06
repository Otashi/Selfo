import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalCmp, ModalController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service'
import { LoginPage } from '../login/login';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { PedidoactualService } from '../../services/pedidoactual.service';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,
    private qrScanner: QRScanner, private menuCtrl: MenuController, private modalController: ModalController) {
    if(!this.auth.authenticated){
      console.log("Not logged");
      //this.navCtrl.setRoot(LoginPage);
    }
    else {
      console.log(this.auth.authenticated);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.menuCtrl.enable(true);
  }

  scanQR(){
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted
       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: any) => {
         console.log('Scanned something', text.result);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
         this.navCtrl.push('MenuPage', {
          idRestaurante: text.result
         });
         
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }

  openModalMisPedidos(){
    this.navCtrl.push('MispedidosPage');
  }
}
