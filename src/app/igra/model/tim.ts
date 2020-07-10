import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Tim {
    tocnih: number;
    netocnih: number;
    igrac1: string;
    igrac2: string;
    trenutnoCita: string;
    bodovi: number;
    id: number;
    odgovori: string[];
    listaTocnih: string[];

    constructor(id: number) {
        this.id = id;
        this.igrac1 = "";
        this.igrac2 = "";
        this.tocnih = 0;
        this.netocnih = 0;
        this.bodovi = 0;
        this.odgovori = [];
        this.listaTocnih = [];
    }

}