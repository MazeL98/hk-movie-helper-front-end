import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {message} from "antd"
import useRequest from "@/utils/useRequest";
import Top from "./components/top";
import DateScrollPicker from "./components/date-scroll-picker";
import Bottom from "./components/bottom";
import dayjs, { type Dayjs } from "dayjs";
import styles from "./Schedule.module.scss";
import { FilmItem } from "@/types/film";
import { CinemaItem } from "@/types/cinema";
import {
    getScheduleList,
    ScheduleListRes,
    ScheduleListReq,
    getValidDates,
    ValidDatesReq,
} from "@/api/modules/schedule";
import {addUserEvent} from "@/api/modules/event";

import { useUser } from "@/contexts/UserContext";

const Schedule = () => {
    const [currentDate, setCurrentDate] = useState<string>("");
    const [info, setInfo] = useState<FilmItem | CinemaItem>();
    const [schedules, setSchedules] = useState<any>();
    const [dateList, setDateList] = useState<string[]>([]);

    // 取路由传参
    const location = useLocation();
    const { filmID, cinemaID, startDate, endDate } = location.state;

    // 请求有效日期
    const { run: runValidDatesFetch } = useRequest<string[], [ValidDatesReq]>(
        getValidDates
    );
    useEffect(() => {
        const fetchData = async () => {
            if (!filmID && !cinemaID) return;
            let options: ValidDatesReq = {};
            if (filmID) {
                options.filmID = filmID;
                if (startDate) options.startDate = startDate;
                if (endDate) options.endDate = endDate;
            } else if (cinemaID) {
                options.cinemaID = cinemaID;
            }
            const result = await runValidDatesFetch(options);
            setDateList(result as string[]);
            setCurrentDate((result as string[])[0]);
        };
        fetchData();
    }, [filmID, cinemaID, startDate, endDate]);

    // 请求排片列表
    const { run: runScheduleListFetch } = useRequest<ScheduleListRes, [any]>(
        getScheduleList
    );

    useEffect(() => {
        const fetchData = async () => {
            if ((!filmID && !cinemaID) || !currentDate) return;
            let options: ScheduleListReq = {
                date: currentDate,
            };
            if (filmID) {
                options.filmID = filmID;
            } else if (cinemaID) {
                options.cinemaID = cinemaID;
            }

            const result = await runScheduleListFetch(options);
            if (!result) return;
            if ("scheduleByCinema" in result) {
                const { scheduleByCinema, ...rest } = result;
                setInfo(rest);
                setSchedules(scheduleByCinema);
            } else if ("scheduleByFilm" in result) {
                const { scheduleByFilm, ...rest } = result;
                setInfo(rest);
                setSchedules(scheduleByFilm);
            }

            console.log("排片结果", result);
        };

        fetchData();
    }, [currentDate]);

    const handleDateChange = (date: Dayjs) => {
        setCurrentDate(() => date.format("YYYY-MM-DD"));
    };

    // 将排片添加到我的日程中
    const {user} = useUser()
        const { run: runAddUserEvent } = useRequest<any, [any]>(
       addUserEvent
    );
    const onAddToEvent = async(scheduleID:bigint) =>{
      // 将userID,scheduleID,传递给api
      if(!user || !user.id) {
        return message.error("请先登录")
      }
      const res = await  runAddUserEvent({
          userID: user?.id,
          scheduleID: scheduleID
      })
      if(res.id) message.success("添加成功")
    }

    return (
        <div className={styles.scheduleContainer}>
            <Top info={info} type={filmID ? "film" : "cinema"} />
            {startDate && endDate ? (
                <div className={styles.dateTip}>
                    正在查询{dayjs(startDate).format("MM-DD")} -{" "}
                    {dayjs(endDate).format("MM-DD")} 的排片结果
                </div>
            ) : null}
            <DateScrollPicker
                value={currentDate}
                dates={dateList}
                onChange={handleDateChange}
            />
            <Bottom schedules={schedules} onAdd={onAddToEvent} />
        </div>
    );
};

export default Schedule;
