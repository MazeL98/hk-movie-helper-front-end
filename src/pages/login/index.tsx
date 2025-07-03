import { Button, Input } from 'antd'
import './login.scss'
const Login = () => {
  return (
    <div className='P-login'>
      <div>欢 迎 回 来</div>
      <div className='ipt-con'>
        <Input placeholder='账号'></Input>
      </div>
      <div className='ipt-con'>
      <Input placeholder='密码'></Input>
      </div>
      <div className='ipt-con'>
        <Button type='primary' block={true}>登录</Button>
      </div>
    </div>
  )
}

export default Login