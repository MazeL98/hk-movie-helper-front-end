export interface ScheduleItem {
    id: number | string;
  filmSourceID:number;
  source:number;
  filmID?:number;
  cinemaID?:number;
  cinemaName:string;
  date:string;
  time:string;
  house:string;
  attr?:string;
}

