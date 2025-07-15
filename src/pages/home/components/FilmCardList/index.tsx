import Grid from "./components/Grid";
import List from "./components/List";
import NoResult from "@/components/StatusPages/NoResult";


import { FilmCardItem } from "@/types/film";
import { useMediaQuery } from "react-responsive";
type CardListProps = {
    data: FilmCardItem[];
};

const FilmCardList = ({ data }: CardListProps) => {
    if (!data || !data.length) {
        console.log("检测到data无结果");
        return <NoResult />;
    }

    const isMobile = useMediaQuery({ maxWidth: 767 });

    return <>{isMobile ? <List  data={data} /> : <Grid data={data} />}</>;
};

export default FilmCardList;
