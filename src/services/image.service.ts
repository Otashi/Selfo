import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage} from 'angularfire2/storage';
import { Observable } from 'rxjs-compat';

@Injectable()
export class ImageService {

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    
    }

    /*uploadImage(imageURI){
        return new Promise<any>((resolve, reject) => {
          let storageRef = this.storage.storage().ref();
          let imageRef = storageRef.child('image').child('imageName');
          this.encodeImageUri(imageURI, function(image64){
            imageRef.putString(image64, 'data_url')
            .then(snapshot => {
              resolve(snapshot.downloadURL)
            }, err => {
              reject(err);
            })
          })
        })
      }*/
}