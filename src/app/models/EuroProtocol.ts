import { AddressOfAccident } from "./AddressOfAccident";
import { Side } from "./Side";
import { Witness } from "./Witness";

export interface EuroProtocol {
    registrationDateTime : Date;
    serialNumber: string;
    address : AddressOfAccident;
    sideA : Side;
    sideB : Side;
    isClosed : boolean;
    witnesses : Array<Witness>;
}
