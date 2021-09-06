export class Transport{
    constructor(
        public id: string,
        public producedBy: string,
        public model: string,
        public vinCode: string,
        public categoryName: string,
        public carPlate: string,
        public color: string,
        public insuaranceNumber : string,
        public yearOfProduction: number
    ){ }
}