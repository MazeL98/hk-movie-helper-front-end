import { Col, Row } from "antd";
import styles from "./CinemaFilters.module.scss";
import { useEffect, useState } from "react";
import { getTheaterList } from "@/api/modules/cinema";
import { TheaterItem } from "@/types/cinema";

type CinemaFiltersProps = {
    currentFilter: {
        district: number | null;
        theater: number | null;
    };
    change: (field: "district" | "theater", value: number | null) => void;
};

type FilterItem = {
    name: string;
    field: "district" | "theater";
    options: { label: string; value: number|null }[];
};

const filters: FilterItem[] = [
    {
        name: "区域",
        field: "district",
        options: [
          {label: '全部',value: null},
            {
                label: "香港",
                value: 1,
            },
            {
                label: "九龙",
                value: 2,
            },
            {
                label: "新界",
                value: 3,
            },
        ],
    },
    {
        name: "院线品牌",
        field: "theater",
        options: [],
    },
];

const CinemaFilters = ({ currentFilter, change }: CinemaFiltersProps) => {
    const clickFilterOption = (
        field: "theater" | "district",
        option: { label: string; value: number | null }
    ) => {
        change(field, option.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res: TheaterItem[] = await getTheaterList();
            if (res) {
                const idx = filters.findIndex(
                    (filter) => filter.field === "theater"
                );
                filters[idx].options = res.map((item) => {
                    return { label: item.name, value: Number(item.id) };
                });
                filters[idx].options.unshift({label: '全部',value: null})
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.cinemaFilters}>
            {filters.map((filter) => (
                <Row key={filter.field}>
                    <div className={styles.filterItem}>
                        <Col xs={5} sm={5} md={5} lg={3}>
                            <div className={styles.filterName}>
                                {filter.name}
                            </div>
                        </Col>
                        <Col xs={19} sm={19} md={19} lg={21}>
                            <div className={styles.filterOptions}>
                                {filter.options.map((option) => (
                                    <div
                                        key={option.value}
                                        className={
                                            currentFilter[filter.field] ===
                                            option.value
                                                ? `${ styles.filterOptionLabel} ${styles.active}`
                                                : styles.filterOptionLabel
                                        }
                                        onClick={() =>
                                            clickFilterOption(
                                                filter.field,
                                                option
                                            )
                                        }
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </div>
                </Row>
            ))}
        </div>
    );
};

export default CinemaFilters;
