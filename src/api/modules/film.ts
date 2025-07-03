import { get } from "../index";
import { PaginatedReq,PaginatedResult } from "@/types/common"
import {FilmCardItem} from "@/types/film"

export interface FilmListReq extends PaginatedReq {
  searchVal?:string
}
export const getFilmList = (params: FilmListReq):Promise<PaginatedResult<FilmCardItem>> => {
    return get("/film/list", params);
};

export const getFilmsByScheduleDateRange  = (params: {startDate:string,endDate:string}) :Promise<FilmCardItem[]>=>{
  return get("/film/list_by_date_range", params);
}
