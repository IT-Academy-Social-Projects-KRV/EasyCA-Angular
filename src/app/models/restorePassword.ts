
export class RestorePassword {
    constructor(
        public email: string,
        public password : string,
        public confirmPassword : string,
        public clientURI:string
    ) { }
  } 
