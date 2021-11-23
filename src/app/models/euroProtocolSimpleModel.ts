import { AddressOfAccident } from "./AddressOfAccident";

export interface EuroProtocolSimpleModel {
    serialNumber: string;
    registrationDateTime : Date;
    address : AddressOfAccident;
    isClosed : boolean;
}
