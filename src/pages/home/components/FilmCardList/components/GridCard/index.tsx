import { Card, Image, Skeleton } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./GridCard.module.scss";

import {
    ShowScheduleOutlined,
    DouBanFilled,
    DirectorOutlined,
    IMDBFilled,
} from "@/components/ExtraIcons";

import { useLang } from "@/contexts/LanguageContext";
import { useLoading } from "@/contexts/LoadingContext";
import { DateRangeContext } from "../../../DateTab";

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

const GridCard = ({ data }: FilmCardProps) => {
    const navigate = useNavigate();
    const loading = useLoading();
    const { lang } = useLang();
    const currentDateRange = useContext(DateRangeContext);

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
        {
            attrs_key: "IMDb评分",
            attrs_value:
                Number(data.rating_imdb) === 0 ? "暂无评分" : data.rating_imdb,
            attrs_icon: <IMDBFilled className={styles.imdbIcon} />,
        },
    ];

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
        return "/src/assets/default-movie.png";
    };

    return (
      loading ?  <Skeleton.Node active style={{ width: 180,height: 270 }} />:
      
        <Card hoverable className={styles.filmCardItem} bordered={false}>
            <Image src={getPoster()} preview={false}></Image>
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{getCardTitle()}</div>
                <div className={styles.attrsGroup}>
                    {data.attrs.map((attr: any, index: number) => (
                        <span className={styles.label} key={attr.attrs_key}>
                            {attr.attrs_icon}
                            {attr.attrs_value}
                            {data.attrs && index < data.attrs.length - 1 ? (
                                <span
                                    style={{ paddingRight: 4, paddingLeft: 4 }}
                                >
                                    /
                                </span>
                            ) : (
                                ""
                            )}
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.showScheduleWrapper} onClick={toDetail}>
                <div className={styles.showSchedule}>
                    <ShowScheduleOutlined className={styles.showScheduleIcon} />
                    <span>查看排片</span>
                </div>
            </div>
        </Card>

    );
};

export default GridCard;
