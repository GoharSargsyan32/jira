import { Avatar, Dropdown, Typography, Flex, theme } from "antd";
import { auth } from "../../../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";



const {useToken} = theme;
const {Text} = Typography;

const AuthProfileDropDown = () => {
    const {token} = useToken();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth)
        } catch(error) {
            console.log(error, "SignOut error")
        }
    }

    const items = [
        {
            label: "Profile",
            key: "0",
            onClick: ()=> navigate(ROUTE_CONSTANTS.PROFILE)
        },
        {
            label: "Cabinet",
            key: "1",
            onClick: ()=> navigate(ROUTE_CONSTANTS.CABINET)

        },
        {
            label: "Logout",
            key: "logout",
            onClick: handleSignOut,

            

        }
    ];

  return (
    <div>
      <Dropdown 
      menu={{items}} 
      trigger={"click"}
      dropdownRender={(menu)=> {
        return(
            <div style={{
                borderRadius: token.borderRadiusLG,
                backgroundColor: token.colorBgElevated,
                boxShadow: token.boxShadowSecondary,
            }}>
                <Flex vertical align="center" style={{padding:token.sizeMS}}>
                    <Avatar src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"/>
                    <Text>John Smith</Text>
                    <Text type="secondary" underline>johnsmith@gmail.com</Text>
                </Flex>
                {menu}
            </div>
        )
      }}
      >
        <Avatar size={"large"} className="user_profile_avatar">
          J S
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default AuthProfileDropDown;
