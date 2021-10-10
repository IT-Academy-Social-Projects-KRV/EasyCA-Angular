import { Data } from "./data";
import { EuroProtocol } from "./euroProtocol";
import { Transport } from "./Transport";

export interface EuroProtocolFullModel {
    euroProtocol: EuroProtocol;
    euroProtocolFullAddress: string;
    sideACircumstances: Array<string>;
    sideBCircumstances: Array<string>;
    userDataSideA: Data;
    userDataSideB: Data;
    transportSideA: Transport;
    transportSideB: Transport;
}
