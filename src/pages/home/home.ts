import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service'
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {
    if(!this.auth.authenticated){
      console.log("Not logged");
      this.navCtrl.setRoot(LoginPage);
    }
    else {
      console.log(this.auth.authenticated);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
