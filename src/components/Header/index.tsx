import { Button, Card, Image } from "antd";
import { HomeOutlined, CalenderOutlined } from "../ExtraIcons";
import { useLocation, useNavigate } from "react-router-dom";
import  styles from "./Header.module.scss";
const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const menuList = [
        {
            path: "/home",
            icon: <HomeOutlined />,
        },
        {
            path: "/calendar",
            icon: <CalenderOutlined style={{transform: 'scale(1.1)',marginTop: 3}} />,
        },
    ];


    return (
        <Card className={styles.mHeader}>
            <div className={styles.headerWrapper}>
                <div className={styles.headerLeft}>
                    <Image>Logo</Image>
                    <div className={styles.title}>HK-Movie-Helper</div>

                </div>
                <div className={styles.headerRight}>
                    <div className={styles.rightMenu}>
                        {menuList.map((menu) => (
                            <Button
                                key={menu.path}
                                className={
                                    location.pathname === menu.path
                                        ? `${styles.active} ${styles.svgButton}`
                                        : styles.svgButton
                                }
                                onClick={() => {
                                    navigate(menu.path);
                                }}
                            >
                              {menu.icon}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Header;
