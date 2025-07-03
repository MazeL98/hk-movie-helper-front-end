import {  Result,Image } from 'antd';

const NoResult = () => {
  return (
    <Result
    status="warning"
    icon={<Image src="/src/assets/status/no-result.png" preview={false} height={200} />}
    title=""
    subTitle="暂无数据"
  />
  )
}

export default NoResult