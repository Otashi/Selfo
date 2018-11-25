import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { validateEmail } from '../../utils/helper';
import { myAlert } from '../../utils/helper';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  email: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

  resetPassword(email: string) {
    this.auth.resetPassword(email);
    myAlert("Email de reinicio de contraseña enviado", 'Enviado', this.alertCtrl);
    this.navCtrl.setRoot(LoginPage);
  }

  formValidation(){
    if (!validateEmail(this.email)){
      myAlert("El email introducido no es correcto", 'Error', this.alertCtrl);
    }else {
      this.resetPassword(this.email);
    }
  }
}
