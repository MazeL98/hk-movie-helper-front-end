import { Card, Image,Button,Skeleton } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ListCard.module.scss";
import defaultMoviePoster from "@/assets/default-movie.png"
import {
    ShowScheduleOutlined,
    DouBanFilled,
    DirectorOutlined,
} from "@/components/ExtraIcons";
import { useLang } from "@/contexts/LanguageContext";
import { useLoading } from "@/contexts/LoadingContext";
import { DateRangeContext } from "../../../DateTab/index";
import { FilmCardItem } from "@/types/film";
import dayjs from "dayjs";
interface FilmCardData extends FilmCardItem {
    attrs?: {
        attrsKey: string;
        attrsValue: string | number | null;
        attrsIcon?: React.ReactNode;
    }[];
}
interface FilmCardProps {
    data: FilmCardData;
}

const ListCard = ({ data }: FilmCardProps) => {
    const navigate = useNavigate();
    const currentDateRange = useContext(DateRangeContext);
  const loading = useLoading();

    const toDetail = () => {
        const queries: any = { filmID: data.id };
        if (currentDateRange && currentDateRange.length) {
            queries.startDate = currentDateRange[0];
            queries.endDate = currentDateRange[1];
        }else {
                  queries.startDate = dayjs().format('YYYY-MM-DD')
                }
        navigate("/schedule/", {
            state: queries,
        });
    };
    data.attrs = [
        {
            attrsKey: "导演",
            attrsValue: data.directorEN.length
                ? data.directorEN
                : "暂无导演",
            attrsIcon: <DirectorOutlined className={styles.attrIcon} />,
        },
        {
            attrsKey: "豆瓣评分",
            attrsValue:
                Number(data.ratingDouban) === 0
                    ? "暂无评分"
                    : data.ratingDouban,
            attrsIcon: <DouBanFilled className={styles.attrIcon} />,
        },
    ];
    const { lang } = useLang();
    const getCardTitle = () => {
        const obj = {
            EN: data.nameEN,
            HK: data.nameHK,
            Simplified: data.nameSimplified,
        };
        return obj[lang] ?? obj.HK;
    };

    const getPoster = () => {
        if (data.posterUrlInternal) {
            return data.posterUrlInternal;
        }
        return defaultMoviePoster;
    };
    return (
            // loading ?  <Skeleton.Input active style={{height: 120,width:'100%',margin:'8px 0' }}  />:

        <Card  className={styles.filmCardItem} bordered={false}>
            <Image src={getPoster()} preview={false} className={styles.poster}></Image>
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{getCardTitle()}</div>
                <div className={styles.attrsGroup}>
                    {data.attrs.map((attr: any, index: number) => (
                        <div className={styles.label} key={attr.attrsKey}>
                            {attr.attrsIcon}
                            {attr.attrsValue}
                        </div>
                    ))}
                </div>
            </div>

                            <Button className={styles.showScheduleButton} onClick={toDetail}>
                    <ShowScheduleOutlined className={styles.showScheduleIcon} />
                </Button>
        </Card>
    );
};

export default ListCard;
