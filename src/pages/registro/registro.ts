import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ALLOW_MULTIPLE_PLATFORMS } from '@angular/core/src/application_ref';

import { User } from '../../model/user'; 
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  myUser: User = {
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  };
  signupError: string;
  passwordRepited: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public db: AngularFireDatabase,
    private auth: AuthService) {

    //this.db.list('site').push(this.myUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  Myalert(message: string){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  saveUser(uid: string){
    console.log(this.myUser.name);

  this.db.object('/users/' + uid)
    .update({
      nombre: this.myUser.name,
      email: this.myUser.email,
      telefono: this.myUser.phoneNumber}); 
  }
  signup() {
		//let data = this.form.value;
		let credentials = {
			email: this.myUser.email,
			password: this.myUser.password
    };
      this.auth.signUp(credentials).then(
      res => {
        console.log(res.user.uid);
        this.saveUser(res.user.uid);
        this.navCtrl.setRoot(HomePage);

      },
      error => {this.signupError = error.message;this.Myalert(error.message);}
    );
  }

  formValidation(){
    console.log(this.myUser.password + ' / ' + this.passwordRepited);
    if(this.myUser.name == undefined ||  this.myUser.name == ''){
      this.Myalert("El campo de nombre es obligatorio");
    } else if (!this.validateEmail(this.myUser.email)){
      this.Myalert("El email introducido no es correcto");
    }else if(this.myUser.password =='' || this.myUser.password == undefined){
      this.Myalert("El campo de contraseña es obligatorio");
    }else if(this.myUser.password !== this.passwordRepited){
      this.Myalert("Las contraseñas no coinciden");
    } else if(this.myUser.password.length < 6){
      this.Myalert("Las contraseña tiene que tener más de 6 caracteres");
    } else {
      this.signup();
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
