import {  Result,Image } from 'antd';
import noResult from "@/assets/status/no-result.png"
const NoResult = () => {
  return (
    <Result
    status="warning"
    icon={<Image src={noResult} preview={false} height={200} />}
    title=""
    subTitle="暂无数据"
  />
  )
}

export default NoResult