import { useState, useMemo,useEffect  } from "react";
import { Button } from "antd";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    CalenderOutlined,
} from "@/components/ExtraIcons";
import {
    Calendar,
    dayjsLocalizer,
    Formats,
    DateLocalizer,
    HeaderProps,
    View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import styles from "./Calendar.module.scss";

import Forbidden from "@/components/StatusPages/Forbidden";

import { events } from "node_modules/react-horizontal-scrolling-menu/dist/types/constants";
import useRequest from "@/utils/useRequest";
import { useUser } from "@/contexts/UserContext";
import {getUserEvent,UserEventParams} from "@/api/modules/event";
import { EventItem } from "@/types/event";

const getEvents = () => {
    return [
        {
            start: new Date("2025-09-16T18:30:00"),
            end: new Date("2025-09-16T20:45:00"),
            title: "加奈子的幸福杀手生活",
        },
        {
            start: new Date("2025-09-16T10:30:00"),
            end: new Date("2025-09-16T12:45:00"),
            title: "加奈子的幸福杀手生活",
        },
        {
            start: new Date("2025-09-17T15:30:00"),
            end: new Date("2025-09-17T16:45:00"),
            title: "加奈子的幸福杀手生活2",
        },
    ];
};

// const CustomTimeGutter: React.ComponentType<any> = ({ children }) => {
//     return <div style={{ background: "#eee",width:'120px' }}>{children}</div>;
// };

const CustomTimeHeader: React.ComponentType = () => (
    <div className={styles.headerIconContainer}>
        <CalenderOutlined className={styles.headerIcon} />
    </div>
);

const CustomTimeSlot: React.ComponentType<any> = ({ children }) => {
    return (
        <div
            style={{
                fontSize: 16,
                color: "#010101",
                width: 88,
                textAlign: "center",
            }}
        >
            {children}
        </div>
    );
};

const CustomWeakHeader: React.ComponentType<HeaderProps> = ({
    date,
    label,
    localizer,
}) => {
    return (
        <div className={styles.weekHeader}>
            <div style={{ fontSize: 12 }}>{localizer.format(date, "ddd")}</div>
            <div style={{ fontSize: 24, fontWeight: "600" }}>
                {localizer.format(date, "D")}
            </div>
        </div>
    );
};

const FilmCalendar = () => {
    const localizer = dayjsLocalizer(dayjs);
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState(getEvents());
    // 当前年份、月份、周日期
    const year = useMemo(() => {
        console.log("date", dayjs(date).format("YYYY-MM-DD"));

        return date.getFullYear();
    }, [date]);
    const month = useMemo(() => {
        console.log("date", dayjs(date).format("YYYY-MM-DD"));

        return date.getMonth() + 1;
    }, [date]);
    // const startOfWeek = localizer.format(localizer.startOf(date,'week',1),'D')
    // const endOfWeek = localizer.format(localizer.endOf(date,'week',1),'D')
    // const firstVisibleDay = localizer.firstVisibleDay(date,localizer)

    // 请求日程列表
    const {user} = useUser()

        const { run: runGetUserEvent } = useRequest<EventItem[], [UserEventParams]>(
            getUserEvent
        );

        // useEffect(() => {
        //   const fetchData = async() =>{
        //     if(!user || !user.id) return;
        //     await runGetUserEvent({
        //       userID: user?.id,

        //     })
        //   }

        //   fetchData()
        // })
    const formats: Formats = useMemo(
        () => ({
            timeGutterFormat: (date, culture, localizer) => {
                return (localizer as DateLocalizer).format(date, "h a", "en");
            },
        }),
        []
    );

    const navigateToWeek = (key: "previous" | "next" | "today") => {
        switch (key) {
            case "previous":
                setDate((prevVal) => localizer.add(prevVal, -1, "week"));
                break;
            case "next":
                setDate((prevVal) => localizer.add(date, 1, "week"));
                break;
            default:
                setDate(new Date());
        }
    };

    const handleNavigate = (newDate: Date) => {
        const res = localizer.startOf(newDate, "month");
    };

    return (
        <div className="calendar-container">
            <div className={styles.topContainer}>
                <div className={styles.topTitle}>
                    <div className={styles.currentMonth}>
                        <span className={styles.month}>{month}</span>月, {year}
                    </div>
                    <div className={styles.toolbar}>
                        <Button
                            icon={
                                <ArrowLeftOutlined
                                    className={styles.toolIcon}
                                />
                            }
                            onClick={() => navigateToWeek("previous")}
                            type="link"
                        ></Button>
                        <Button
                            onClick={() => navigateToWeek("today")}
                            type="link"
                            autoInsertSpace={false}
                        >
                            本周
                        </Button>
                        <Button
                            icon={
                                <ArrowRightOutlined
                                    className={styles.toolIcon}
                                />
                            }
                            onClick={() => navigateToWeek("next")}
                            type="link"
                        ></Button>
                    </div>
                    {/* <div>{startOfWeek} - {endOfWeek}</div> */}
                    <div style={{ fontSize: 14 }}>我的观影日历</div>
                </div>
            </div>

            <div className={styles.calendarContainer}>
                <Calendar
                    className={styles.myCalendar}
                    localizer={localizer}
                    events={events}
                    defaultDate={new Date()}
                    date={date}
                    defaultView="week"
                    views={["week"]}
                    style={{ height: 600 }}
                    toolbar={false}
                    formats={formats}
                    onNavigate={handleNavigate}
                    components={{
                        timeGutterHeader: CustomTimeHeader, // 左上角“时间”标题
                        timeSlotWrapper: CustomTimeSlot,
                        week: {
                            header: CustomWeakHeader,
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default FilmCalendar;
