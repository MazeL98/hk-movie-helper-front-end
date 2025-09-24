export interface FilmCardItem {
    id: number | string;
    nameHK: string;
    nameEN: string;
    nameSimplified: string;
    directorEN: string;
    directorHK: string;
    directorSimplified: string;
    ratingDouban: number | null;
    ratingImdb: number | null;
    posterUrlInternal?:string;
}

export interface FilmItem {
     id:number;
     filmSourceID: number;
     imdbID?: string;
     doubanID?: string;
     nameHK: string;
     nameEN: string;
     nameSimplified: string;
     language?: string;
     onScreenDate?: string;
     duration?: string;
     genres?: string;
     posterUrlExternal?: string;
     posterUrlInternal?: string;
     directorEN: string;
     directorHK: string;
     directorSimplified: string;
     castEN?: string;
     castHK?: string;
     castSimplified?: string;
     ratingDouban: number;
     ratingImdb: number;
     country?: string;
     status?: number;
     source: number;

}

