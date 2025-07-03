import { PaginatedReq } from "./common";

export interface TheaterItem {
    id: number | string;
    name: string;
}


export interface CinemaItem {
  id:number|string;
  name_hk: string;
  name_simplified: string;
  name_en: string;
  district_id: number;
  district_name: string;
  theater_id: number;
  theater_name: string;
  address_hk:string;
  address_en: string;
  logo?:string;
}

export interface CinemaListReq extends PaginatedReq {
  districtId?: number;
  theaterId?:number;
}