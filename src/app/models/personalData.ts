import { UserDriverLicense } from "./userDriverLicense";
import { Address} from "./address"; 
export interface PersonalData { 
         address: Address;
         ipn: string;
         serviceNumber: string;
         birthDay: Date;
         jobPosition: string;
         userDriverLicense: UserDriverLicense;
         userCars: Array<string>;
 } 