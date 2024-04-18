export class User {
    constructor(
        readonly id:string,
        readonly email:string,
        readonly password:string,
        readonly name:string,
        readonly lastname: string,
        readonly age: number,
        readonly activity: string,
        readonly frequency: string,
        readonly height: number,
        readonly weight: number,
    ){}
}