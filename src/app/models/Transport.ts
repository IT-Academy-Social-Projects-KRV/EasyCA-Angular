import { Insuarance } from "./Insuarance";
export interface Transport{
    id: string;
    producedBy: string;
    model: string;
    categoryName: string;
    vinCode: string;
    carPlate: string;
    userId:string;
    color: string;
    yearOfProduction: number;
    insuaranceNumber: Insuarance;
}