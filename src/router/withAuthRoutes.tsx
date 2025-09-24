import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

// 鉴权的具体逻辑
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  
  const {user} = useUser()
  const isLoggedIn = Boolean(user?.id && user?.accessToken);
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/403" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

// 统一处理路由
 const withAuthRoutes = (routes: any[]) =>{
  return routes.map(route =>{
    if(route.meta && route.meta.requiresAuth) {
      route.element = <RequireAuth> {route.element} </RequireAuth>
    }
    if(route.children) {
      route.children = withAuthRoutes(route.children)
    }
    return route
  })
}

export default withAuthRoutes