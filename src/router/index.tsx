import { createHashRouter,Navigate } from "react-router-dom";
import Login from "../pages/login";
import Entry from "@/pages/entry";
import Home from "../pages/home";
import Schedule from "@/pages/schedule";
import Profile from "../pages/profile";
import Calendar from "@/pages/calendar";
import ServerError from "@/components/StatusPages/ServerError"
import NotFound from "@/components/StatusPages/NotFound";
import Forbidden from "@/components/StatusPages/Forbidden";
export const globalRouters = createHashRouter([
  {
    path: '/login',
    element: <Login />
  },
        {
        path: '/500',
        element: <ServerError />
      },
        {
        path: '/404',
        element: <NotFound />
      },
        {
        path: '/403',
        element: <Forbidden />
      },
  {
    path: '/',
    element: <Entry />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/schedule',
        element: <Schedule />
      },

      {
        path: '/profile',
        element: <Profile />
      },{
        path: '/calendar',
        element: <Calendar />
      },{
        path: '/',
        element: <Home />
      },
       // 未匹配，，跳转Login页面
       {
        path: '*',
        element: <Navigate to="/login" />,
    },
    ]
  }
])