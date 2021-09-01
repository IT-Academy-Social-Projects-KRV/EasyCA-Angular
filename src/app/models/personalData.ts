import { DriverLicence } from "./driverLicence";
import { Address } from "./adress"; 

export class PersonalData {
    constructor(
        public address: Address,
        public ipn: string,
        public serviceNumber: string,
        public birthDay: Date,
        public jobPosition: string,
        public userDriverLicense: DriverLicence
    ) { }
  } 