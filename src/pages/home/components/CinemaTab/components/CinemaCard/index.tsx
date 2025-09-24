import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
    ShowScheduleOutlined,
    AddressOutlined,
    CinemaFilled
} from "../../../../../../components/ExtraIcons";

import { CinemaItem } from "@/types/cinema";
import styles from "./CinemaCard.module.scss";

type CinemaCardProps = {
    data: CinemaItem;
};

const CinemaCard = ({ data }: CinemaCardProps) => {
    const navigate = useNavigate();
    const toDetail = () => {
        navigate("/schedule/", {
            state: {
                cinemaId: data.id,
                startDate:dayjs().format('YYYY-MM-DD')
            },
        });
    };
    return (
        <Card hoverable  className={styles.cinemaCardItem} bordered={false} onClick={toDetail}>
            <div className={styles.cinemaLogoBg}>
              <CinemaFilled className={styles.defaultCinemaLogo} />
            </div>
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{data.nameHK}</div>
                <div className={styles.cardSubtitle}>
                    <AddressOutlined className={styles.addressIcon} />
                    {data.addressHK}
                </div>
            </div>
            <div className={styles.showSchedule} >
                <ShowScheduleOutlined className={styles.showScheduleIcon} />
                <span>查看排片</span>
            </div>
        </Card>
    );
};

export default CinemaCard;
