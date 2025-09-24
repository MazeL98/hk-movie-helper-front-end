import {post} from "../index"

interface UserLogin {
  email: string;
  password:string;
}

export const login = (data: UserLogin) => {
    return post("/user/login", data);
};

interface UserRegister {
  username:string;
  email:string;
  password:string;
}

export const register = (data:UserRegister)=>{
  return post("/user/register",data)
}