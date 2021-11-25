import { AddressOfAccident } from "./AddressOfAccident";
import { side } from "./Side";
import { Witness } from "./Witness";

export interface EuroProtocol {
    registrationDateTime : Date;
    serialNumber: string;
    address : AddressOfAccident;
    sideA : side;
    sideB : side;
    isClosed : boolean;
    witnesses : Array<Witness>;
}
