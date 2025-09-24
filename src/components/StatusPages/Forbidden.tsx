import {  Result ,Image,Button} from 'antd';
import { useNavigate } from 'react-router-dom';
import forbiddenImage from "@/assets/status/access-denied.png"
const Forbidden = () => {
    const navigate = useNavigate()
  const backToHome = () =>{
    navigate('/')
  }
  return (
    <Result   icon={<Image src={forbiddenImage} preview={false} height={300} />}  title="403" subTitle="请登录后访问"  extra={[
      <Button type="primary" key="console" onClick={backToHome}>
        回到首页
      </Button>,
    ]} ></Result>
  )
}

export default Forbidden