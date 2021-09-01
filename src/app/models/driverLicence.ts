import { TransportCategories } from "./transportCategories";

export class DriverLicence {
    constructor(
        public LicenseSerialNumber: string,
        public IssuedBy: string,
        public ExpirationDate: Date,
        public UserCategories: Array<TransportCategories>
    ) { }
} 