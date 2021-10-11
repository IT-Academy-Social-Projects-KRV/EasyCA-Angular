import { AddressOfAccident } from "./addressOfAccident";

export interface EuroProtocolSimpleModel {
    serialNumber: string;
    registrationDateTime : Date;
    address : AddressOfAccident;
    isClosed : boolean;
}
