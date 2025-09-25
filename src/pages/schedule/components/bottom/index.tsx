import { CinemaSchedules, FilmSchedules } from "@/api/modules/schedule";

import styles from "./Bottom.module.scss";
import { Tooltip } from "antd";
import { AddFilled } from "@/components/ExtraIcons";
import NoResult from "@/components/StatusPages/NoResult";

interface ScheduleListProps {
    schedules: CinemaSchedules[] | FilmSchedules[];
    onAdd:(scheduleID:bigint) => void
}

const Bottom = ({ schedules,onAdd }: ScheduleListProps) => {
    if (!schedules) {
        return <NoResult />;
    }

    return (
        <div className={styles.scheduleListWrapper}>
            {schedules.map((item) => (
                <div className={styles.firstLevelItem} key={item.id}>
                    <div className={styles.firstLevelHeader}>{item.nameHK}</div>
                    {item.schedules.map((schedule) => (
                        <div
                            className={styles.secondLevelItem}
                            key={schedule.id}
                        >
                            <div className={styles.secondLevelLeft}>
                                <div>{schedule.time}</div>
                                <div>{schedule.house}</div>
                                <div>{schedule.attr}</div>
                            </div>
                            <div className={styles.secondLevelRight}>
                                <Tooltip
                                    placement="rightTop"
                                    title="加入我的排片"
                                    color="#010101"
                                >
                                    <div className={styles.actionButton} role="button" onClick={() => onAdd(schedule.id)}>
                                        <AddFilled
                                            className={styles.actionButtonIcon}
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Bottom;
