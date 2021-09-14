import { UserDriverLicense } from "./userDriverLicense";
import { UserAddress} from "./userAddress"; 
export interface UserData { 
         userAddress: UserAddress;
         ipn: string;
         serviceNumber: string;
         birthDay: Date;
         jobPosition: string;
         userDriverLicense: UserDriverLicense;
         userCars: Array<string>;
 } 