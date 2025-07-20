import { useState, useEffect, useRef, createContext } from "react";
import DateFilter from "./components/DateFilter";
import NoResult from "@/components/StatusPages/NoResult";
import FilmCardList from "../FilmCardList";

import useRequest from "@/utils/useRequest";
import { LoadingContext } from "@/contexts/LoadingContext";

import styles from "./DateTab.module.scss";
import { getFilmsByScheduleDateRange } from "@/api/modules/film";
import { FilmCardItem } from "@/types/film";
import dayjs from "dayjs";

const DATE_RANGE_SESSION_KEY = "date_range";

export const DateRangeContext = createContext<string[]>([]);

const DateTab = () => {
    const initDateRange = () => {
    
        const old = sessionStorage.getItem(DATE_RANGE_SESSION_KEY);
        console.log("触发init",old)
        return old
            ? JSON.parse(old)
            : [
                  dayjs().format("YYYY-MM-DD"),
                  dayjs().add(7, "day").format("YYYY-MM-DD"),
              ];
    };

    const [dateStrings, setDateStrings] = useState<string[]>(initDateRange);

    const [data, setData] = useState<FilmCardItem[]>([]);
    const { loading,err, run } = useRequest<
        FilmCardItem[],
        [{ startDate: string; endDate: string }]
    >(getFilmsByScheduleDateRange);

    // 筛选时间发生改变
    const handleDateQuery = (newDateStrings: [string, string]) => {
        setDateStrings(() => newDateStrings);
        sessionStorage.setItem(
            DATE_RANGE_SESSION_KEY,
            JSON.stringify(newDateStrings)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
          console.log("触发dateQuery请求")
            if (!dateStrings[0] || !dateStrings[1]) return;
            const result = (await run({
                startDate: dateStrings[0],
                endDate: dateStrings[1],
            })) as FilmCardItem[];
            if (result.length) {
                setData(() => result);
            } else{
              setData([])
            }
        };
        fetchData();
    }, [dateStrings]);

    if (err) {
        return <NoResult />;
    }
    return (
        <div className={styles.dateTabWrapper}>
            <DateFilter change={handleDateQuery} defaultValue={dateStrings}/>
            <DateRangeContext.Provider value={dateStrings}>
                <LoadingContext.Provider value={loading}>
                  <FilmCardList data={data}></FilmCardList>
                </LoadingContext.Provider>
            </DateRangeContext.Provider>
        </div>
    );
};

export default DateTab;
