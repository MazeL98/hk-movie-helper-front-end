import { get } from "../index";
import { ScheduleItem } from "@/types/schedule";
import { FilmItem } from "@/types/film";
import { CinemaItem } from "@/types/cinema";

// 没有写错，按cinemaId查找的排片是按照电影来返回的
export interface FilmSchedules extends FilmItem {
  schedules: ScheduleItem[]
}
export interface ScheduleByCinema extends CinemaItem {
    scheduleByFilm:  FilmSchedules;
}

export interface CinemaSchedules extends CinemaItem {
  schedules:ScheduleItem[]
}
export interface ScheduleByFilm extends FilmItem {
    scheduleByCinema: CinemaSchedules;
}

export type ScheduleListRes = ScheduleByFilm| ScheduleByCinema;

export interface ScheduleListReq {
    filmId?: number;
    date?: string;
    cinemaId?: number;
}

// 定义函数重载
// 获取某个电影院拍片
export function getScheduleList(params: {
    cinemaId: number;
    date: string;
}): Promise<ScheduleByCinema>;

// 获取某个电影的拍片
export function getScheduleList(params: {
    filmId: number;
    date: string;
}): Promise<ScheduleByFilm>;

export function getScheduleList(params: any): Promise<ScheduleListRes> {
    return get("/schedule/list", params);
}


export interface ValidDatesReq {
  filmId?:number;
  cinemaId?:number;
  startDate?:string;
  endDate?:string;
}
// 获取排片日期
export function getValidDates(params:ValidDatesReq):Promise<string[]> {
  return get("/schedule/valid_dates", params);
}
