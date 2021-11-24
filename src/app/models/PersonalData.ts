import { Address } from "./Address";
import { UserDriverLicense } from "./UserDriverLicense";

export interface PersonalData { 
   address: Address;
   ipn: string;
   serviceNumber: string;
   birthDay: Date;
   jobPosition: string;
   userDriverLicense: UserDriverLicense;
   userCars: Array<string>;
}  
