import { TransportCategories } from "./transportCategories";

export class DriverLicence {
    constructor(
        public licenseSerialNumber: string,
        public issuedBy: string,
        public expirationDate: Date,
        public userCategories: Array<TransportCategories>
    ) { }
} 
