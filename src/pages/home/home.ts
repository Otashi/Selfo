import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthService) {
    if(!this.auth.authenticated){
      console.log("Not logged");
      //this.navCtrl.setRoot(LoginPage);
    }
    else {
      console.log(this.auth.getEmail());
    }
  }

}
