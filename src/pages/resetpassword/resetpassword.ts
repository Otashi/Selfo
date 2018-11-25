import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, 
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

  resetPassword(email: string) {
    this.auth.resetPassword(email);
    this.myAlert("Email de reinicio de contraseña enviado");
    this.navCtrl.setRoot(LoginPage);
  }


  myAlert(message: string){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  formValidation(){
    if (!this.validateEmail(this.email)){
      this.myAlert("El email introducido no es correcto");
    }else {
      this.resetPassword(this.email);
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
