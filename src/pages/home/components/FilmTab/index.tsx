import {
    useEffect,
    useState,
    useMemo,
    useCallback,
    useRef,
    createContext,
} from "react";
import { Input, Divider } from "antd";

import FilmCardList from "../FilmCardList";
import NoResult from "@/components/StatusPages/NoResult";
import Loading from "@/components/Loading";
import usePageScrollLoad from "@/components/PageScrollLoad";
import { SearchOutlined } from "@/components/ExtraIcons";

import useRequest from "@/utils/useRequest";
import { LoadingContext } from "@/contexts/LoadingContext";
import { debounce } from "@/utils/debounce";

import { getFilmList, FilmListReq } from "@/api/modules/film";

import { PaginatedResult } from "@/types/common";
import { FilmCardItem } from "@/types/film";

import styles from "./FilmTab.module.scss";

const FilmTab = () => {
    // 滚动加载数据
    const {
        loading: reqLoading,
        err,
        run,
    } = useRequest<PaginatedResult<FilmCardItem>, [FilmListReq]>(getFilmList);
    const [data, setData] = useState<FilmCardItem[]>([]);
    const [pagination, setPagination] = useState({
        pageNo: 1,
        pageSize: 24,
    });
    const [searchValue, setSearchValue] = useState("");

    const [hasMore, setHasMore] = useState(true);

    //共享loading状态

    const fetchData = async (
        pageNo: number,
        pageSize = 24,
        searchVal?: string
    ) => {
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

    // 初始加载
    useEffect(() => {
        fetchData(1, pagination.pageSize, "");
    }, []);

    // 滚动加载
    const loadMore = () => {
        if (reqLoading || !hasMore) return;
        fetchData(pagination.pageNo, pagination.pageSize, searchValue);
    };

    usePageScrollLoad({ loadMore, hasMore, threshold: 180 });

    // 键入搜索
    //搜索调用接口时加上防抖
    const debouncedFetch = useCallback(
        debounce((searchValue: string) => {
            console.log("以防抖的方式调用fetch");
            setPagination((prev) => ({ ...prev, pageNo: 1 }));
            fetchData(1, pagination.pageSize, searchValue);
        }, 400),
        []
    );
    const isComposing = useRef(false);
    const handleCompositionStart = () => {
        isComposing.current = true;
    };

    const handleCompositionEnd = (e: any) => {
        isComposing.current = false;
        const value = e.target.value;
        setSearchValue(value);
        debouncedFetch(value);
    };

    const handleNormalChange = (e: any) => {
        const value = e.target.value;
        setSearchValue(value);
        if (!isComposing.current) {
            debouncedFetch(value);
        }
    };

    if (err || (!reqLoading &&(!data || !data.length))) {
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
            <LoadingContext.Provider value={reqLoading}>
                <FilmCardList data={data}></FilmCardList>
            </LoadingContext.Provider>
            <div>
                {hasMore ? (
                    <Loading />
                ) : (
                    <Divider
                        plain
                        style={{ color: "#a4a4a4", margin: "16px 0 44px" }}
                    >
                        End
                    </Divider>
                )}
            </div>
        </div>
    );
};

export default FilmTab;
