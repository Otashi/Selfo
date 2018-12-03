import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  userUid: string;
  myUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
    private userService: UserService) {

    this.userUid = this.authService.getUid();
    if(this.userUid != null){
      this.userService.getUserById(this.userUid).subscribe(
        value => {
          this.myUser = value;
          console.log(this.myUser);
        })
        err => {console.log(err)};
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
