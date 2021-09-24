import { Evidence } from "./evidence";

export interface side {
    email: string;
    trasportId: string;
    circumstances: Array<number>;
    evidences: Array<Evidence>;
    driverLicenseSerial: string;
    damage: string;
    isGulty: boolean;
}