import { Dropdown, MenuProps, Button } from "antd";
import { FC, useState } from "react";
import styles from "./LangSwitcher.module.scss";
type Language = "EN" | "Simplified" | "HK";

interface LangSwitcherProps {
    currentLang: Language;
    onChange: (lang: Language) => void;
}

interface LanguageItem {
    key: Language;
    label: string;
}

const languageItems: LanguageItem[] = [
    { key: "Simplified", label: "简" },
    { key: "EN", label: "EN" },
    { key: "HK", label: "繁" },
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
