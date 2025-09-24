import { Dropdown, MenuProps, Avatar, Button,message ,Modal} from "antd";
import { useState } from "react";
import LoginModal from "../../../LoginModal";
import { useUser, User } from "@/contexts/UserContext";
import { SettingOutlined,LogoutOutlined } from "@/components/ExtraIcons";
import styles from "./UserDropdown.module.scss";

const UserDropdown = () => {
    // 登录与注册
    const [isModalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState<"login" | "register">("login");

    const { user, setUser,logout } = useUser();

    const openModal = (currentMode: "login" | "register") => {
        setModalVisible(true);
        setMode(currentMode);
    };

    const onLoginModalClose = () => {
        setModalVisible(false);
    };

    const onLoginSuccess = (data: User) => {
        setModalVisible(false);
        setUser(data);
    };

    const [logoutVisible,setLogoutVisible] = useState(false)

 

    const handleLogout = () => {
      setLogoutVisible(false)
      logout()
      message.success("退出登录成功")
    }

    const userMenuItems: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <div className={styles.userInfo}>
                    <Avatar
                        size={36}
                        src={user?.avatar ?? ""}
                        style={{backgroundColor: '#dddddd'}}
                    >
                        {user?.avatar
                            ? ""
                            : user?.username.substring(0, 1).toUpperCase()}{" "}
                    </Avatar>
                    <div >
                      <div className={styles.userTitle}>{user?.username}</div>
                      <div className={styles.userSubtitle}>{user?.email}</div>
                    </div>
                </div>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "2",
            label: <a target="_blank" className={styles.menuItem}>
              <SettingOutlined  />
              <span>设置</span>
            </a>,
        },

        {
            key: "3",
            label: <a target="_blank" className={styles.menuItem} onClick={() => setLogoutVisible(true)}>
              <LogoutOutlined />
              <span>退出</span>
            </a>,
        },
    ];

    return (
        <div className={styles.userContainer}>
            {user && user.id ? (
                <>
                    <Dropdown
                        menu={{ items: userMenuItems }}
                        overlayClassName={styles.userDropdown}
                    >
                        <div
                            className={styles.userInfo}
                            onClick={(e) => e.preventDefault()}
                        >
                            {
                                <Avatar
                                    size={30}
                                    src={user.avatar ?? ""}
                                    className={styles.userAvatar}
                                >
                                    {user.avatar
                                        ? ""
                                        : user.username
                                              .substring(0, 1)
                                              .toUpperCase()}
                                </Avatar>
                            }
                        </div>
                    </Dropdown>
                </>
            ) : (
                <>
                    <Button
                        type="link"
                        autoInsertSpace={false}
                        className={styles.loginButton}
                        onClick={() => openModal("login")}
                    >
                        登录
                    </Button>
                    <Button
                        type="link"
                        autoInsertSpace={false}
                        className={styles.loginButton}
                        onClick={() => openModal("register")}
                    >
                        注册
                    </Button>
                </>
            )}
            <LoginModal
                visible={isModalVisible}
                mode={mode}
                onSwitchMode={(val) => setMode(val)}
                onClose={onLoginModalClose}
                onLoginSuccess={onLoginSuccess}
            />
            <Modal
        title={<span style={{fontWeight:400,fontSize:14}}>确认退出登录吗？</span>}
        closable={false}
        open={logoutVisible}
        onOk={handleLogout}
        width={360}
        onCancel={() => setLogoutVisible(false)}
        okText="确认"
        cancelText="取消"
      >
      </Modal>
        </div>
    );
};

export default UserDropdown;
