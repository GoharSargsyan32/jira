import { Typography } from "antd";
import "./index.css";


const { Title } = Typography;

const AuthWrapper = ({ title, bunner, children }) => {
    console.log(bunner)
  return (
    <div className="auth_wrapper">
      <div className="banner_container" style={{backgroundImage: `url(${bunner}`, backgroundRepeat: 'no-repeat', backgroundPosition: "center", backgroundSize: "cover" }}/>

      <div className="form_container">
        <Title level={3}>{title}</Title>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
