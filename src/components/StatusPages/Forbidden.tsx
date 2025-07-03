import {  Result } from 'antd';
const Forbidden = () => {
  return (
    <Result status={403} title="403" subTitle="没有访问权限" ></Result>
  )
}

export default Forbidden