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

interface FilmCardData extends FilmCardItem {
    attrs?: {
        attrs_key: string;
        attrs_value: string | number | null;
        attrs_icon?: React.ReactNode;
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
        const queries: any = { filmId: data.id };
        if (currentDateRange && currentDateRange.length) {
            queries.startDate = currentDateRange[0];
            queries.endDate = currentDateRange[1];
        }
        navigate("/schedule/", {
            state: queries,
        });
    };
    data.attrs = [
        {
            attrs_key: "导演",
            attrs_value: data.director_en.length
                ? data.director_en
                : "暂无导演",
            attrs_icon: <DirectorOutlined className={styles.attrIcon} />,
        },
        {
            attrs_key: "豆瓣评分",
            attrs_value:
                Number(data.rating_douban) === 0
                    ? "暂无评分"
                    : data.rating_douban,
            attrs_icon: <DouBanFilled className={styles.attrIcon} />,
        },
    ];
    const { lang } = useLang();
    const getCardTitle = () => {
        const obj = {
            en: data.name_en,
            hk: data.name_hk,
            simplified: data.name_simplified,
        };
        return obj[lang] ?? obj.hk;
    };

    const getPoster = () => {
        if (data.poster_url_internal) {
            return data.poster_url_internal;
        }
        return defaultMoviePoster;
    };
    return (
            loading ?  <Skeleton.Input active style={{height: 120,width:'100%',margin:'8px 0' }}  />:

        <Card  className={styles.filmCardItem} bordered={false}>
            <Image src={getPoster()} preview={false} className={styles.poster}></Image>
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{getCardTitle()}</div>
                <div className={styles.attrsGroup}>
                    {data.attrs.map((attr: any, index: number) => (
                        <div className={styles.label} key={attr.attrs_key}>
                            {attr.attrs_icon}
                            {attr.attrs_value}
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
