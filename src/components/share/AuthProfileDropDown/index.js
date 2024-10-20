import { Avatar, Dropdown, Typography, Flex, theme } from "antd";

const {useToken} = theme;
const {Text} = Typography;

const AuthProfileDropDown = () => {
    const {token} = useToken();
    const items = [
        {
            label: "Profile",
            key: "0"
        },
        {
            label: "Cabinet",
            key: "1"
        },
        {
            label: "Logout",
            key: "2"
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
