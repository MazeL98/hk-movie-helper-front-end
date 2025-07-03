import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import styles from "./Entry.module.scss"
import LangSwitch from "@/components/Header/components/LangSwitcher";
import { useLang } from "@/contexts/LanguageContext";
import BackButton from "@/components/BackButton";

const Entry = () => {
  const {lang, setLang} = useLang()

    return (
        <div className={styles.layout}>
          <BackButton />
            <Header />
            <div className={styles.mainContainer}>
              <Outlet  />
            </div>
             <LangSwitch currentLang={lang} onChange={(lang) => setLang(lang)} />
        </div>
    );
};

export default Entry;
