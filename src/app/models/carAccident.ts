import { AddressOfAccident } from "./AddressOfAccident";
import { Evidence } from "./Evidence";
import { sideCA } from "./SideCA";
import { Witness } from "./Witness";

export interface CarAccident {
    id: string;
    serialNumber: string;
    inspectorId: string;
    registrationDateTime: Date;
    address: AddressOfAccident;
    sideOfAccident: sideCA;
    accidentCircumstances: string;
    trafficRuleId: string;
    driverExplanation: string;
    witnesses: Array<Witness>;
    evidences: Array<Evidence>;
    courtDTG: Date;
    isDocumentTakenOff: boolean;
}
