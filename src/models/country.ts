export interface Country{
    name:Name;
    currencies: {};
    capital:[];
    region:string;
    population:number;
    flags:Flags;

}

type Flags = {
    alt:string;
    svg:string;
}

type Name = {
    common: string;
    nativeName:{};
}