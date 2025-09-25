import { get ,post,del} from "../index";
import {EventItem} from "@/types/event"
export interface UserEventParams {
  userID:bigint;
  startDate:string;
  endDate:string;

}



export const getUserEvent = (params: UserEventParams):Promise<EventItem[]> => {
    return get("/event/list", params);
};

export const addUserEvent = (data: Event) => {
    return post("/event/add", data);
};

export const deleteUserEvent = (eventID:bigint) =>{
  return del("/event/delete/"+eventID.toString())
}