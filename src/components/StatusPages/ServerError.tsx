import {  Result,Image,Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const ServerError = () => {
  const navigate = useNavigate()
  const backToHome = () =>{
    navigate('/')
  }
  return (
    <Result status={500} icon={<Image src="/src/assets/status/server-error.png" preview={false} height={200} />} title="500" subTitle="服务器出错，请稍后刷新重试" extra={[
      <Button type="primary" key="console" onClick={backToHome}>
        Back To Home
      </Button>,
    ]} ></Result>
  )
}

export default ServerError