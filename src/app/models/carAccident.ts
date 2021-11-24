import { AddressOfAccident } from "./addressOfAccident";
import { EvidenceCA } from "./evidenceCA";
import { sideCA } from "./sideCA";
import { Witness } from "./witness";

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
    evidences: Array<EvidenceCA>;
    courtDTG: Date;
    isDocumentTakenOff: boolean;
}
