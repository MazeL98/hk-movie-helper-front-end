import { Card, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
    ShowScheduleOutlined,
    AddressOutlined,
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
            },
        });
    };
    return (
        <Card hoverable  className={styles.cinemaCardItem} bordered={false} onClick={toDetail}>
            <div className={styles.cinemaLogoBg}></div>
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{data.name_hk}</div>
                <div className={styles.cardSubtitle}>
                    <AddressOutlined className={styles.addressIcon} />
                    {data.address_hk}
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
