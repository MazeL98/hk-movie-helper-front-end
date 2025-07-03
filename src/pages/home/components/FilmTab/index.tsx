import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Input } from "antd";
import FilmCardList from "../FilmCardList";
import NoResult from "@/components/StatusPages/NoResult";
import usePageScrollLoad from "@/components/PageScrollLoad";
import { SearchOutlined } from "@/components/ExtraIcons";
import useRequest from "@/utils/useRequest";
import { debounce } from "@/utils/debounce";
import { getFilmList, FilmListReq } from "@/api/modules/film";
import { PaginatedResult } from "@/types/common";
import { FilmCardItem } from "@/types/film";

import styles from "./FilmTab.module.scss";

const FilmTab = () => {
    console.log("渲染FilmTab");
    // 滚动加载数据
    const { loading, err, run } = useRequest<
        PaginatedResult<FilmCardItem>,
        [FilmListReq]
    >(getFilmList);
    const [data, setData] = useState<FilmCardItem[]>([]);
    const [pagination, setPagination] = useState({
        pageNo: 1,
        pageSize: 24,
    });
    const [searchValue, setSearchValue] = useState("");

    const [hasMore, setHasMore] = useState(true);

    const fetchData = async (
        pageNo: number,
        pageSize = 24,
        searchVal?: string
    ) => {
        console.log("触发fetch");

        const result = await run({ pageNo, pageSize, searchVal });
        if (!result || !result.data || !result.data.length) {
            setHasMore(false);
            if (pageNo === 1) {
                setData([]);
            }
            return;
        }
        if (pageNo === 1) {
            setData(() => result.data);
        } else {
            setData((prev) => [...prev, ...result.data]);
        }
        setPagination((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
        const totalLoaded = (data?.length || 0) + (result?.data?.length || 0);
        const total = result?.total || 0;
        setHasMore(totalLoaded < total);
    };

    // 触发加载
    const loadMore = () => {

        if (loading || !hasMore) return;
        fetchData(pagination.pageNo, pagination.pageSize, searchValue);
    };

    //搜索调用接口时加上防抖
    const debouncedFetch = useCallback(
        debounce((searchValue: string) => {
            console.log("以防抖的方式调用fetch");
            setPagination((prev) => ({ ...prev, pageNo: 1 }));
            fetchData(1, pagination.pageSize, searchValue);
        }, 400),
        []
    );

    useEffect(() => {
        fetchData(1, pagination.pageSize, "");
    }, []);

    const isComposing = useRef(false);

    const handleCompositionStart = () => {
        isComposing.current = true;
    };

    const handleCompositionEnd = (e:any) =>{
      isComposing.current = false;
      const value = e.target.value;
        setSearchValue(value);
        debouncedFetch(value);
    }

    const handleNormalChange = (e: any) => {
        const value = e.target.value;
        setSearchValue(value);
        if(!isComposing.current) {
          debouncedFetch(value);
        }
    };

    usePageScrollLoad({ loadMore, hasMore, threshold: 180 });

    if (loading && pagination.pageNo === 1) {
        return <div>loading...</div>;
    }
    if (err) {
        return <NoResult />;
    }
    return (
        <div style={{ width: "100%" }}>
            <div className={styles.searchInputWrapper}>
                <Input
                    variant="filled"
                    placeholder="搜索电影"
                    value={searchValue}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    onChange={handleNormalChange}
                    className={styles.searchInput}
                    suffix={<SearchOutlined />}
                />
            </div>
            <FilmCardList data={data}></FilmCardList>
        </div>
    );
};

export default FilmTab;
