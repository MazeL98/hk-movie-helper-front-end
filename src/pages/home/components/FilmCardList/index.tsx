import Grid from "./components/Grid";
import List from "./components/List";

import { FilmCardItem } from "@/types/film";
import { useMediaQuery } from "react-responsive";
type CardListProps = {
    data: FilmCardItem[];
};

const FilmCardList = ({ data }: CardListProps) => {

    const isMobile = useMediaQuery({ maxWidth: 767 });

    return <>{isMobile ? <List  data={data} /> : <Grid data={data} />}</>;
};

export default FilmCardList;
