import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalCmp, ModalController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service'

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { myAlert } from '../../utils/helper';


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
    private qrScanner: QRScanner, private menuCtrl: MenuController, private modalController: ModalController,
    private alertController: AlertController) {
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
    window.document.querySelector('ion-app').classList.add('whiteBody');
    this.menuCtrl.enable(true);
  }

  scanQR(){
   this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted
       // start scanning
       window.document.querySelector('ion-app').classList.add('transparentBody');
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
         this.navCtrl.push('MenuPage', {
          idRestaurante: text
         });
        this.qrScanner.destroy();
       });
       this.qrScanner.show();
     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));

  /*this.navCtrl.push('MenuPage', {
    idRestaurante: 'Borrar'
   });*/

  }

  openModalMisPedidos(){
    this.navCtrl.push('MispedidosPage');
  }

  ionViewDidLeave() {
    window.document.querySelector('ion-app').classList.add('whiteBody');
  }
}
