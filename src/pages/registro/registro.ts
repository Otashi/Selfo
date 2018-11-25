import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ALLOW_MULTIPLE_PLATFORMS } from '@angular/core/src/application_ref';

import { User } from '../../model/user'; 
import { AuthService } from '../../services/auth.service';
import { validateEmail } from '../../utils/helper';
import { myAlert } from '../../utils/helper';

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
export class RegistroPage{

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
        this.navCtrl.setRoot('HomePage');

      },
      error => {this.signupError = error.message;myAlert(error.message, 'Error', this.alertCtrl);}
    );
  }

  formValidation(){
    console.log(this.myUser.password + ' / ' + this.passwordRepited);
    if(this.myUser.name == undefined ||  this.myUser.name == ''){
      myAlert("El campo de nombre es obligatorio", 'Error', this.alertCtrl);
    } else if (!validateEmail(this.myUser.email)){
      myAlert("El email introducido no es correcto", 'Error', this.alertCtrl);
    }else if(this.myUser.password =='' || this.myUser.password == undefined){
      myAlert("El campo de contraseña es obligatorio", 'Error', this.alertCtrl);
    }else if(this.myUser.password !== this.passwordRepited){
      myAlert("Las contraseñas no coinciden", 'Error', this.alertCtrl);
    } else if(this.myUser.password.length < 6){
      myAlert("Las contraseña tiene que tener más de 6 caracteres", 'Error', this.alertCtrl);
    } else {
      this.signup();
    }
  }
}
