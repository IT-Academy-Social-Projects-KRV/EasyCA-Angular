import { Evidence } from "./evidence";

export interface Side{
    email: string;
    transportId: string;
    circumstances: Array<number>;
    evidences: Array<Evidence>;
    driverLicenseSerial: string;
    damage: string;
    isGulty: boolean;
}