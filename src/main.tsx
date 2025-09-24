
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { globalRouters } from '@/router';
import { ConfigProvider } from 'antd';
import { LangProvider } from './contexts/LanguageContext';
import { UserProvider } from './contexts/UserContext';
 // 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN';
// 引入样式入口文件
import '@/styles/index.scss';
createRoot(document.getElementById('root')!).render(
  <UserProvider >
  <LangProvider>
  <ConfigProvider locale={zhCN} theme={
    {   components: {
      Input: {
activeBorderColor:"transparent",
colorBorder:"transparent"
      },
          Button: {
            colorPrimary: '#010101',
            algorithm: true, // 启用算法
          },
          DatePicker: {
            colorPrimary: '#f5f5f5',
            colorFillSecondary:"#f2f0ea",
            activeBg:"#f2f0ea",
            activeBorderColor:"transparent",
            algorithm: true, // 启用算法
          }
        },cssVar: true, hashed: false }
  }>
    <RouterProvider router={globalRouters} />
  </ConfigProvider>
  </LangProvider>
  </UserProvider>
)
