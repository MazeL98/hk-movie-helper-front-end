export interface ScheduleItem {
    id: number | string;
  film_source_id:number;
  source:number;
  film_id?:number;
  cinema_id?:number;
  cinema_name:string;
  date:string;
  time:string;
  house:string;
  attr?:string;
}

