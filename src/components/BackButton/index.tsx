import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./BackButton.module.scss";
const BackButton = () => {
   const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/') {
    return null;
  }
  const handleBack = () =>{
 if (window.history.length <= 2) {
      // 2. If user directly accessed this page (no prior history)
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  }
  return (
                    <Button shape="circle"  type="primary" icon={<LeftOutlined />} className={styles.backButton} onClick={handleBack}></Button>

  )
}

export default BackButton