import { useContext } from "react";
import { AuthContex } from "../../../Context/authContextProvider";
import { Flex, Button } from "antd";
import AuthProfileDropDown from "../../share/AuthProfileDropDown";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import "./index.css";


const Header = () => {
  const {isAuth, userProfileInfo} = useContext(AuthContex);
  return (
    <div className="main_header">
      <Flex justify="space-between" align="center">
        <p>Logo</p>
        <div>
          {
          
            isAuth ? <AuthProfileDropDown userProfileInfo = {userProfileInfo}/> : <Link to={ROUTE_CONSTANTS.LOGIN}><Button>Sign In</Button></Link> 
          }
        </div>
      </Flex>
    </div>
  );
};

export default Header;
