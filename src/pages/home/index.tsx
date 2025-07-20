import { useState, useEffect } from "react";
import { Card } from "antd";
import FilmTab from "./components/FilmTab";
import CinemaTab from "./components/CinemaTab";
import DateTab from "./components/DateTab";
import styles from "./Home.module.scss";

const TAB_SESSION_KEY = "current_tab";

const options = [
    { label: "电影", value: "film" },
    { label: "影院", value: "cinema" },
    { label: "时段", value: "date" },
];

const tabComponent: Record<string, () => JSX.Element> = {
    film: () => <FilmTab />,
    cinema: () => <CinemaTab />,
    date: () => <DateTab />,
};

const Home = () => {
    const initCurrentTab = () => {
        return sessionStorage.getItem(TAB_SESSION_KEY) || options[0].value;
    };
    const [currentTab, setCurrentTab] = useState(initCurrentTab);

    useEffect(() => {
        sessionStorage.setItem(TAB_SESSION_KEY, currentTab);
    }, [currentTab]);

    return (

            <div className={styles.container}>
                {/* 模式选择 */}
                <div className={styles.tabs}>
                    {options.map((option) => (
                        <Card
                            hoverable
                            bordered={false}
                            key={option.label}
                            onClick={() => setCurrentTab(option.value)}
                            className={
                                currentTab === option.value
                                    ? `${styles.tabActive} ${styles.tabItem}`
                                    : styles.tabItem
                            }
                        >
                            <div className={styles.label}>{option.label}</div>
                        </Card>
                    ))}
                </div>
                {/* 列表 */}
                <div className={styles.tabContent}>
                    {tabComponent[currentTab]()}
                </div>
            </div>
    );
};

export default Home;
