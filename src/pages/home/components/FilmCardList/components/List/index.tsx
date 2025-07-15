import ListItem from "../ListItem";

import styles from "./List.module.scss";
import { FilmCardItem } from "@/types/film";

type CardListProps = {
    data: FilmCardItem[];
};

const List = ({ data }: CardListProps) => {

    return (
            <div className={styles.filmCardList}>
                {data.map((card) => (
                    <ListItem key={card.id} data={card} />
                ))}
            </div>

    );
};

export default List;