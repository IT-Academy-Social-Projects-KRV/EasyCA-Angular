import { AddressOfAccident } from "./addressOfAccident";
import { Side } from "./side";
import { Witness } from "./witness";

export interface EuroProtocol{
    registrationDateTime: Date;        
    serialNumber: string;
    address: AddressOfAccident;
    sideA: Side;
    sideB: Side;
    isClosed: boolean;
    witnesses: Array<Witness>;
}
