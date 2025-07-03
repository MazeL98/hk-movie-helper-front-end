import FilmCard from "./components/FilmCard";
import NoResult from "@/components/StatusPages/NoResult";

import styles from "./FilmCardList.module.scss";
import { FilmCardItem } from "@/types/film";
type CardListProps = {
  data: FilmCardItem[]
}


const FilmCardList = ({data}:CardListProps) => {
  if(!data || !data.length) {
    console.log("检测到data无结果")
    return <NoResult />
  }
    return (
        <div className={styles.filmCardListWrapper}>
            <div className={styles.filmCardList}>
                {data.map((card) => (
                    <FilmCard key={card.id} data={card} />
                ))}
            </div>
        </div>
    );
};

export default FilmCardList;
