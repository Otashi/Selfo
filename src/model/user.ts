export class User {

    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    
    constructor (nombre: string, mail: string, pass: string, phone: string){
        this.name = nombre;
        this.email = mail;
        this.password = pass;
        this.phoneNumber = phone;
    }
}