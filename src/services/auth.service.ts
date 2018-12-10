import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
	private user: firebase.User;

	myCredentials = {
        email: 'luishong.wu@gmail.com',
        password: 'lolazo123'
      };

	constructor(public afAuth: AngularFireAuth) {

    this.signInWithEmail(this.myCredentials);
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		this.afAuth.authState.subscribe(user => {
			this.user = user;
		});
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
    }

    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	get authenticated() {
		return this.user;
	}

	getEmail() {
	return this.user && this.user.email;
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	resetPassword(email: string) {
		return this.afAuth.auth.sendPasswordResetEmail(email)
			.then(() => console.log("email sent"))
			.catch((error) => console.log(error))
	}

	getUid(){
		return this.user.uid;
	}

}
