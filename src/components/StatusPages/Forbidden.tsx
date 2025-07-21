import {  Result ,Image} from 'antd';
import forbiddenImage from "@/assets/status/access-denied.png"
const Forbidden = () => {
  return (
    <Result   icon={<Image src={forbiddenImage} preview={false} height={300} />}  title="403" subTitle="该功能仍在开发中......" ></Result>
  )
}

export default Forbidden