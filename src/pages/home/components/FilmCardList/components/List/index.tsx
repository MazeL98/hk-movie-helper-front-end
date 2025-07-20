import ListCard from "../ListCard";

import styles from "./List.module.scss";
import { FilmCardItem } from "@/types/film";

type CardListProps = {
    data: FilmCardItem[];
};

const List = ({ data }: CardListProps) => {

    return (
            <div className={styles.filmCardList}>
                {data.map((card) => (
                    <ListCard key={card.id} data={card} />
                ))}
            </div>

    );
};

export default List;