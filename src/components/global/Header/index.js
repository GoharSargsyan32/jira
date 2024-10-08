import "./index.css";
import { Flex, Button } from "antd";
const Header = () => {
  return (
    <div className="main_header">
      <Flex justify="space-between" align="center">
        <p>Logo</p>
        <div>
          <Button>Sign In</Button>
        </div>
      </Flex>
    </div>
  );
};

export default Header;
