import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { MenuPage } from '../pages/menu/menu';
import { MenuService } from '../services/menu.service';
import { RestauranteService } from '../services/restaurante.service';
import { ComponentsModule } from '../components/components.module';
import { QRScanner } from '@ionic-native/qr-scanner';
import { UserService } from '../services/user.sercive';
import { ImageService } from '../services/image.service';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    PerfilPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    LoginPage,
    PerfilPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
    MenuService,
    RestauranteService,
    QRScanner,
    UserService,
    ImageService,
    Camera,
  ]
})
export class AppModule {}
