import { Image } from "antd";
import defaultMoviePoster from "@/assets/default-movie.png"
import styles from "./Top.module.scss";
import { FilmItem } from "@/types/film";
import { CinemaItem } from "@/types/cinema";
import { useLang } from "@/contexts/LanguageContext";

interface FieldItem {
    label: string;
    key?: string;
    baseKey?: string;
    render?: (val: any, item?: FilmItem) => React.ReactNode;
}

const filmFields: FieldItem[] = [
    { label: "导演", baseKey: "director" },
    { label: "演员", baseKey: "cast" },
    { label: "时长", key: "duration" },
    { label: "类型", key: "genres" },
    { label: "语言", key: "language" },
    { label: "豆瓣评分", key: "rating_douban" },
    { label: "IMDB评分", key: "rating_imdb" },
];

const cinemaFields: FieldItem[] = [{label: "地址",baseKey: 'address'}]


type ScheduleTopProps = {
  type: 'cinema' | 'film',
  info: FilmItem | CinemaItem | undefined
}
const Top = ({info,type}:ScheduleTopProps) => {
    const { lang } = useLang();
    if(!info) {
      return ''
    }
    const getFields = () =>{
      if(type === 'cinema') {
        return cinemaFields
      }else {
        return filmFields
      }
    }

        const getPoster = () =>{
      if('poster_url_internal' in info && info.poster_url_internal) {
        return info.poster_url_internal
      }
      return defaultMoviePoster
    }
    return (
        <div className={styles.topContainer}>
            <Image
                className={styles.imgContainer}
                src={getPoster()}
            ></Image>
            <div className={styles.topRight}>
                <div className={styles.title}>{info[`name_${lang}`]}</div>
                <div className={styles.propertyWrapper}>
                    {getFields().map(({ label, key, baseKey, render }) => {
                        let fullkey;
                        if (baseKey) {
                            fullkey = `${baseKey}_${lang}` as keyof (FilmItem | CinemaItem);
                        } else {
                            fullkey = key as keyof (FilmItem | CinemaItem);
                        }
                        const value = info[fullkey];
                        return (
                            <div key={fullkey} className={styles.propertyItem}>
                                <span className={styles.propertyLabel}>{label}</span>: {render ? render(value) : value}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Top;
