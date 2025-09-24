import { Card, Image, Skeleton ,Rate, Button} from "antd";
import { ReactElement, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./GridCard.module.scss";
import defaultMoviePoster from "@/assets/default-movie.png"
import {
    ShowScheduleOutlined,
    DouBanFilled,
    DirectorOutlined,
} from "@/components/ExtraIcons";

import { useLang } from "@/contexts/LanguageContext";
import { useLoading } from "@/contexts/LoadingContext";
import { DateRangeContext } from "../../../DateTab";

import { FilmCardItem } from "@/types/film";

import dayjs from "dayjs";

interface FilmCardData extends FilmCardItem {
    attrs?: {
        attrs_key: string;
        attrs_value: string | number | null | ReactElement;
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

    const getLangKey = (language: typeof lang, key: string) =>{ 
      return key + '_' + language;
    }

    const getCardTitle = () => {
      const keyWithLang =  getLangKey(lang,'name') as keyof FilmCardItem
        return data[keyWithLang] as string ?? data.name_hk;
    };
console.log('Title',getCardTitle())
    const getDirector = () =>{
      return data[getLangKey(lang,'director') as keyof FilmCardItem] ?? data.director_hk
    }

    const toDetail = () => {
        const queries: any = { filmId: data.id };
        if (currentDateRange && currentDateRange.length) {
            queries.startDate = currentDateRange[0];
            queries.endDate = currentDateRange[1];
        } else {
          queries.startDate = dayjs().format('YYYY-MM-DD')
        }
        navigate("/schedule/", {
            state: queries,
        });
    };

    data.attrs = [
        {
            attrs_key: "导演",
            attrs_value: getDirector() ?? "--",
            attrs_icon: <DirectorOutlined className={styles.attrIcon} />,
        },
        {
            attrs_key: "豆瓣评分",
            attrs_value: <Rate disabled value={Number(data.rating_douban) / 10 * 5 } />
               ,
            attrs_icon: <DouBanFilled className={styles.attrIcon} />,
        },
    ];
    const getPoster = () => {
        if (data.poster_url_internal) {
            return data.poster_url_internal;
        }
        return defaultMoviePoster;
    };

    return (
        <Card hoverable className={styles.filmCardItem} bordered={false}>
            <Image src={getPoster()} preview={false}></Image>
            <div className={styles.cardBody}>
                <div className={`${styles.cardTitle} ${getCardTitle().length > 9 ? styles.titleSmall : ''}`}>{getCardTitle()}</div>
                <div className={styles.attrsGroup}>
                    {data.attrs.map((attr: any, _) => (
                        <div className={styles.label} key={attr.attrs_key}>
                            {attr.attrs_icon}
                            {attr.attrs_value}
                        </div>
                    ))}
                </div>
                <Button className={styles.showMoreButton} onClick={toDetail}><ShowScheduleOutlined className={styles.buttonIcon} />查看排片</Button>
            </div>

        </Card>

    );
};

export default GridCard;
