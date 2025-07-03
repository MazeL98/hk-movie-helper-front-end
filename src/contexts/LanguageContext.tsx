import React, { createContext, useContext, useState } from 'react';

 type Lang = 'en' | 'simplified' | 'hk';

export const getPropertyByLang = (propName:string,lang:Lang) =>{

  return propName+'_'+lang
}

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: 'hk',
  setLang: () => {},
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('hk');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);