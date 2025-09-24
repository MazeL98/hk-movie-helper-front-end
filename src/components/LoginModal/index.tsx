import styles from "./LoginModal.module.scss";
import { Modal, Form, Input, Button, message, ConfigProvider } from "antd";
import {
    UserOutlined,
    LockOutlined,
    EmailOutlined,
} from "../../components/ExtraIcons";
import { useState } from "react";

import { login, register } from "@/api/modules/user";

interface LoginModalProps {
    visible: boolean;
    mode: "login" | "register";
    onClose: () => void;
    onSwitchMode: (mode: "login" | "register") => void;
    onLoginSuccess: (data: any) => void;
}

// label 映射
const labels = {
    login: {
        title: "登录",
        subtitle: "随时随地保存自己的排片计划",
        tips: "还没有账号？去",
        redirect: "注册",
    },
    register: {
        title: "注册",
        subtitle: "开始你的排片之旅",
        tips: "已有账号？去",
        redirect: "登录",
    },
};

// 用户名与密码校验

const LoginModal: React.FC<LoginModalProps> = ({
    visible,
    mode = "login",
    onClose,
    onSwitchMode,
    onLoginSuccess,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const close = () => {
        onClose();
        form.resetFields();
    };

    const handleLogin = async () => {
        try {
            const res = await login({
                email: form.getFieldValue("email"),
                password: form.getFieldValue("password"),
            });
            message.success("登录成功");
            onLoginSuccess(res)
        } catch (error: any) {
            message.error(
                error.response?.data?.message || "登录遇到问题，请重试"
            );
        }
    };

    const handleRegister = async () => {
        try {
            const res = await register({
                username: form.getFieldValue("username"),
                email: form.getFieldValue("email"),
                password: form.getFieldValue("password"),
            });
            console.log("注册结果", res);

            message.success("注册成功");
            // onLoginSuccess(token);
            // onClose();
        } catch (error: any) {
            message.error(
                error.response?.data?.message || "注册遇到问题，请重试"
            );
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (mode === "login") {
            await handleLogin();
        } else {
            await handleRegister();
        }
        setLoading(false);
        close();
    };

    // 切换登录注册
    const switchMode = () => {
        onSwitchMode(mode === "login" ? "register" : "login");
        form.resetFields();
    };

    return (
        <ConfigProvider
            modal={{
                classNames: {
                    header: styles.myModalHeader,
                    body: styles.myModalBody,
                },
            }}
            form={{
                className: styles.myForm,
            }}
        >
            <Modal
                title={
                    <>
                        {labels[mode].title} <br />
                        <span style={{ fontSize: 12, color: "#999" }}>
                            {labels[mode].subtitle}
                        </span>
                    </>
                }
                closable={{ "aria-label": "Custom Close Button" }}
                open={visible}
                onCancel={close}
                footer={null}
                width={375}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    variant="filled"
                >
                    {/* 邮箱 */}
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "请输入正确的邮箱格式",
                            },
                            {
                                required: true,
                                message: "请输入邮箱",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className={styles.prefixIcon} />
                            }
                            className={styles.formInput}
                            placeholder="邮箱"
                        />
                    </Form.Item>
                    {/* 用户名 */}
                    {mode === "register" && (
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        const usernameRegex =
                                            /^[A-Za-z][A-Za-z0-9]{3,15}$/;
                                        if (usernameRegex.test(value)) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject(
                                                new Error(
                                                    "用户只能由字母和数字构成，长度在4-16位"
                                                )
                                            );
                                        }
                                    },
                                },
                                {
                                    required: true,
                                    message: "请输入用户名",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <EmailOutlined
                                        className={styles.prefixIcon}
                                    />
                                }
                                className={styles.formInput}
                                placeholder="用户名，由字母和数字构成"
                            />
                        </Form.Item>
                    )}
                    {/* 密码 */}
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                validator: (_, value) => {
                                    const passwordRegex =
                                        /^[A-Za-z0-9!@#$%^&*()]{8,20}$/;
                                    if (passwordRegex.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "密码长度在8-20位字符以内，可包含!@#$%^&*特殊字符"
                                        )
                                    );
                                },
                            },
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className={styles.prefixIcon} />
                            }
                            className={styles.formInput}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            style={{ marginTop: 12 }}
                        >
                            {labels[mode].title}
                        </Button>
                    </Form.Item>
                </Form>

                {/* 切换为注册 */}
                <div style={{ fontSize: "12px" }}>
                    {labels[mode].tips}
                    <Button
                        type="link"
                        className={styles.switchButton}
                        onClick={switchMode}
                    >
                        {labels[mode].redirect}
                    </Button>
                </div>
            </Modal>
        </ConfigProvider>
    );
};

export default LoginModal;
