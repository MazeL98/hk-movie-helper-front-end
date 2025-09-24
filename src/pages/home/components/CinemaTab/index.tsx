import { useEffect, useState } from "react";
import CinemaFilters from "./components/CinemaFilters";
import CinemaCard from "./components/CinemaCard";
import NoResult from "@/components/StatusPages/NoResult";
import { PaginatedResult } from "@/types/common";
import { CinemaListReq } from "@/types/cinema";
import styles from "./CinemaTab.module.scss";
import useRequest from "@/utils/useRequest";
import { getCinemaList } from "@/api/modules/cinema";

import { CinemaItem } from "@/types/cinema";
import usePageScrollLoad from "@/components/PageScrollLoad";

const CinemaTab = () => {
    const { loading, err, run } = useRequest<
        PaginatedResult<CinemaItem>,
        [CinemaListReq]
    >(getCinemaList);
    const [data, setData] = useState<CinemaItem[]>([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize] = useState(24);
    const [hasMore, setHasMore] = useState(true);
    const [districtID, setDistrict] = useState<number | null>(null);
    const [theaterID, setTheater] = useState<number | null>(null);

    // 滚动加载
    const loadMore = () => {
        if (loading || !hasMore) return;
        setPageNo((prev) => prev + 1);
    };

    usePageScrollLoad({ loadMore, hasMore, threshold: 300 });

    // 筛选查询
    const handleQuery = (field: "theater" | "district", value: number | null) => {
        const isRepeatClick = (field === 'theater' && value === theaterID) || (field === 'district' && value === districtID)
        if(isRepeatClick) return;
        if (field === "theater") {
            setTheater(value);
        }
        if (field === "district") {
            setDistrict(value);
        }
        setData([]);
        setPageNo(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            const params: CinemaListReq = { pageNo, pageSize };
            if (districtID) params.districtID = districtID;
            if (theaterID) params.theaterID = theaterID;

            const result = await run(params);

            if (result?.data?.length) {
                setData((prev) =>
                    prev ? [...prev, ...result.data] : result.data
                );
            }
            const totalLoaded =
                (data?.length || 0) + (result?.data?.length || 0);
            const total = result?.total || 0;
            console.log("totalLoaded", totalLoaded, "total", total);
            setHasMore(totalLoaded < total);
        };
        fetchData();
    }, [pageNo, districtID, theaterID]);


    if (err) {
        return <NoResult />;
    }

    return (
        <div className={styles.cinemaCardListWrapper}>
            <div className={styles.cinemaFilterWrapper}>
                <CinemaFilters
                currentFilter={{district: districtID,theater:theaterID}}
                    change={(field: "district" | "theater", value: number | null) =>
                        handleQuery(field, value)
                    }
                />
            </div>
            {data && data.length ? (
                <div className={styles.cinemaCardList}>
                    {data.map((card) => (
                        <CinemaCard key={card.id} data={card} />
                    ))}
                </div>
            ) : (
                <NoResult />
            )}
        </div>
    );
};

export default CinemaTab;
