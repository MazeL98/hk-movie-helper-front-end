
import { get } from "../index";
import { PaginatedReq,PaginatedResult } from "@/types/common";
import {TheaterItem,CinemaItem} from "@/types/cinema"

interface CinemaListParams extends PaginatedReq {
  districtId?: number;
  theaterId?:number;
}

export const getTheaterList = ():Promise<TheaterItem[]> => {
    return get("/theater/list");
};

export const getCinemaList = (params?:CinemaListParams):Promise<PaginatedResult<CinemaItem>> => {
    return get("/cinema/list",params);
};

