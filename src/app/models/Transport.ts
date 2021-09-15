import { Insuarance } from "./insuarance";
export interface Transport{
    id: string;
    producedBy: string;
    model: string;
    categoryName: string;
    vinCode: string;
    carPlate: string;
    color: string;
    yearOfProduction: number;
    insuaranceNumber: Insuarance;
}