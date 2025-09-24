import { createHashRouter,Navigate } from "react-router-dom";
import Entry from "@/pages/entry";
import Home from "../pages/home";
import Schedule from "@/pages/schedule";
import Profile from "../pages/profile";
import Calendar from "@/pages/calendar";
import ServerError from "@/components/StatusPages/ServerError"
import NotFound from "@/components/StatusPages/NotFound";
import Forbidden from "@/components/StatusPages/Forbidden";
import withAuthRoutes from "./withAuthRoutes";

const routes = [
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
        element: <Calendar />,
        meta:{
          requiresAuth:true
        }
      },{
        path: '/',
        element: <Home />
      },
       // 未匹配，，跳转主页面
       {
        path: '*',
        element: <Navigate to="/" />,
    },
    ]
  }
]
export const globalRouters = createHashRouter(withAuthRoutes(routes))