export interface Country{
    name:Name;
    currencies: {[key:string]:currency};
    capital:[];
    region:string;
    population:number;
    flags:Flags;
    cca3:string;//country code
    nativeName:string;
    borders:string[];
    subregion:string;
    languages:{[key:string]:string};
    tld:string[];
}

type Flags = {
    alt:string;
    svg:string;
}

type Name = {
    common: string;
    nativeName:{[key:string]:nativeNameObj};
}

type currency={
    name:string;
    symbol:string;
}

type nativeNameObj={
    official:string;
    common:string;
}