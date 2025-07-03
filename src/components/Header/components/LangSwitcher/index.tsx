import { Dropdown, MenuProps, Button } from "antd";
import { FC, useState } from "react";
import styles from "./LangSwitcher.module.scss";
type Language = "en" | "simplified" | "hk";

interface LangSwitcherProps {
    currentLang: Language;
    onChange: (lang: Language) => void;
}

interface LanguageItem {
    key: Language;
    label: string;
}

const languageItems: LanguageItem[] = [
    { key: "simplified", label: "简" },
    { key: "en", label: "EN" },
    { key: "hk", label: "繁" },
];

const LangSwitch: FC<LangSwitcherProps> = ({ currentLang, onChange }) => {
    const items: MenuProps["items"] = languageItems.map((item) => ({
        key: item.key,
        label: item.label,
    }));

    const getCurrentLabel = () => {
        if (currentLang) {
            const selected = languageItems.find(
                (item) => item.key === currentLang
            );
            return selected?.label;
        }
    };

    const [currentLabel, setCurrentLabel] = useState(getCurrentLabel);
    const onClick: MenuProps["onClick"] = (info) => {
        const selected = languageItems.find((item) => item.key === info.key);
        if (selected && selected.key !== currentLang) {
            setCurrentLabel(selected.label);
            onChange(selected.key);
        }
    };

    return (
        <Dropdown menu={{ items, onClick }} placement="bottomRight">
            <Button className={styles.textButton} shape="circle">
                <div>{currentLabel}</div>
            </Button>
        </Dropdown>
    );
};

export default LangSwitch;
