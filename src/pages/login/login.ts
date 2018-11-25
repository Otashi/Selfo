import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

import { validateEmail } from '../../utils/helper';
import { myAlert } from '../../utils/helper';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myEmail: string;
  myPassword: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, 
    public alertCtrl: AlertController){
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doRegister(){
    this.navCtrl.push("RegistroPage");
  }

  doLogin(){
    if(!validateEmail(this.myEmail)){
      console.log(this.myEmail + ' / ' + this.myPassword);
      console.log(this.alertCtrl);
      myAlert("Email no válido", 'Error', this.alertCtrl);
    }
    else if (this.myPassword==undefined){
      myAlert("El campo de contraseña es obligatorio", 'Error', this.alertCtrl);
    }
    else{
      let credentials = {
        email: this.myEmail,
        password: this.myPassword
      };
      this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot('HomePage'),
				error => myAlert("Email o contraseña incorrectas", 'Error', this.alertCtrl)
			);
    }
  }

  forgotPassword(){
    this.navCtrl.push("ResetpasswordPage");
  }
}
