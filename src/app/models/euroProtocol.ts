import { AddressOfAccident } from "./addressOfAccident";
import { side } from "./side";
import { Witness } from "./witness";

export interface EuroProtocol {
    registrationDateTime : Date;
    serialNumber: string;
    address : AddressOfAccident;
    sideA : side;
    sideB : side;
    isClosed : boolean;
    witnesses : Array<Witness>;
}
