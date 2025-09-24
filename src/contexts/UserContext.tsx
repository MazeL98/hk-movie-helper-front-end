import {createContext,useContext,useState,useEffect,ReactNode} from 'react'

export interface User {
  id:number;
  username:string;
  email:string;
  avatar?:string;
  accessToken?:string;
}

interface UserContextType {
  user:User | null;
  setUser: (user:User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}:{children:ReactNode}) =>{
  const [user,setUserState] = useState<User|null>(null)
  const setUser = (user:User|null) =>{
    setUserState(user);
    if(user) {
      localStorage.setItem("user",JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }
  // 初始化时尝试读取
  useEffect(() =>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      try {
        setUserState(JSON.parse(storedUser))
      } catch (err) {
        localStorage.removeItem("user")
      }
    }
  },[])

  const logout = () => setUser(null)

  return (
    <UserContext.Provider value={{user,setUser,logout}}>
      {children}
    </UserContext.Provider>
  )
}

// 组件内部使用
export const useUser = () =>{
  const context = useContext(UserContext);
  if(!context){
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}