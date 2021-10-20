import { AddressOfAccident } from "./addressOfAccident";
import { Evidence } from "./evidence";
import { side } from "./side";
import { Witness } from "./witness";

export interface CarAccident {
    id: string;
    serialNumber: string;
    inspectorId: string;
    registrationDateTime: Date;
    address: AddressOfAccident;
    sideOfAccident: side;
    accidentCircumstances: string;
    trafficRuleId: string;
    driverExplanation: string;
    witnesses: Witness[];
    evidences: Evidence[];
    courtDTG: Date;
    isDocumentTakenOff: boolean;
    isClosed: boolean
}
