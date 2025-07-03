import {  Result } from 'antd';
const NotFound = () => {
  return (
    <Result status={404} title="404" subTitle="服务器没有找到请求的资源" ></Result>
  )
}

export default NotFound