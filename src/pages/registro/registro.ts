import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ALLOW_MULTIPLE_PLATFORMS } from '@angular/core/src/application_ref';

import { User } from '../../model/user'; 

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public db: AngularFireDatabase) {

    //this.db.list('site').push(this.myUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  Myalert(){
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  saveUser(){
    console.log(this.myUser.name); 
    this.db.list('users').push(this.myUser);
  }
}
