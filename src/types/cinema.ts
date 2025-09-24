import { PaginatedReq } from "./common";

export interface TheaterItem {
    id: number | string;
    name: string;
}


export interface CinemaItem {
  id:number|string;
  nameHK: string;
  nameSimplified: string;
  nameEN: string;
  districtID: number;
  districtName: string;
  theaterID: number;
  theaterName: string;
  addressHK:string;
  addressEN: string;
  logo?:string;
}

export interface CinemaListReq extends PaginatedReq {
  districtID?: number;
  theaterID?:number;
}