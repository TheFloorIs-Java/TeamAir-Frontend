export class User {
    id : number;
    email: string;
    password : string;
    firstName: string;
    lastName: string;
    userOrAdmin: string;
    constructor(id:number, email: string, password : string,firstName: string, lastName: string, userOrAdmin: string){
        this.id=id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userOrAdmin = userOrAdmin;
    }
}