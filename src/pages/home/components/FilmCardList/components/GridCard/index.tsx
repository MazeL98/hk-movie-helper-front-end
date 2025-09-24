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
        attrsKey: string;
        attrsValue: string | number | null | ReactElement;
        attrsIcon?: React.ReactNode;
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
        return data[keyWithLang] as string ?? data.nameHK;
    };
console.log('Title',getCardTitle())
    const getDirector = () =>{
      return data[getLangKey(lang,'director') as keyof FilmCardItem] ?? data.directorHK
    }

    const toDetail = () => {
        const queries: any = { filmID: data.id };
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
            attrsKey: "导演",
            attrsValue: getDirector() ?? "--",
            attrsIcon: <DirectorOutlined className={styles.attrIcon} />,
        },
        {
            attrsKey: "豆瓣评分",
            attrsValue: <Rate disabled value={Number(data.ratingDouban) / 10 * 5 } />
               ,
            attrsIcon: <DouBanFilled className={styles.attrIcon} />,
        },
    ];
    const getPoster = () => {
        if (data.posterUrlInternal) {
            return data.posterUrlInternal;
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
                        <div className={styles.label} key={attr.attrsKey}>
                            {attr.attrsIcon}
                            {attr.attrsValue}
                        </div>
                    ))}
                </div>
                <Button className={styles.showMoreButton} onClick={toDetail}><ShowScheduleOutlined className={styles.buttonIcon} />查看排片</Button>
            </div>

        </Card>

    );
};

export default GridCard;
