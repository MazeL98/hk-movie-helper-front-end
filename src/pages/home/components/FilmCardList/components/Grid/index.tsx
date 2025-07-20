import GridCard from "../GridCard";

import styles from "./Grid.module.scss";
import { FilmCardItem } from "@/types/film";

type CardListProps = {
    data: FilmCardItem[];
};

const Grid = ({ data }: CardListProps) => {

    return (
        <div className={styles.filmCardListWrapper}>
            <div className={styles.filmCardList}>
                {data.map((card) => (
                    <GridCard key={card.id} data={card} />
                ))}
            </div>
        </div>
    );
};

export default Grid;