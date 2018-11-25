import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

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
    if(!this.validateEmail(this.myEmail)){
      console.log(this.myEmail + ' / ' + this.myPassword);
      this.myAlert("Email no válido")
    }
    else if (this.myPassword==undefined){
      this.myAlert("El campo de contraseña es obligatorio")
    }
    else{
      let credentials = {
        email: this.myEmail,
        password: this.myPassword
      };
      this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(HomePage),
				error => this.myAlert("Email o contraseña incorrectas")
			);
    }
  }

  myAlert(message: string){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  forgotPassword(){
    this.navCtrl.push("ResetpasswordPage");
  }
}
