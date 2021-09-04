export class User {
    constructor(
        public id: string,
        public email: string,        
        public firstName: string,
        public lastName: string,
        public password: string,     
        public confirmPassword: string,
        public clientURI:string
    ) { }
}