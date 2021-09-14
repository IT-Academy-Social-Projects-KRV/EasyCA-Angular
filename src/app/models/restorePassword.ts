
export class RestorePassword {
    constructor(
        public email: string,
        public newPassword : string,
        public confirmPassword : string,
        public passwordURI: string
    ) { }
  } 
