import { useState } from "react";
import { Form, Input, Button } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { regexpValidation, ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { Link } from "react-router-dom";
import AuthWrapper from "../../../components/share/AuthWrapper";
import registerBunner from "../../../core/images/login.jpg"

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const response = await signInWithEmailAndPassword(auth, email, password);
      form.resetFields();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper title="Sign In" bunner={registerBunner} >
      <Form
        className="form"
        layout="vertical"
        form={form}
        onFinish={handleLogin}
      >
        <h1>Log In</h1>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
          ]}
        >
          <Input type="email" placeholder="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          tooltip="Password must be min 6 max 16 char..."
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
            {
              pattern: regexpValidation,
              message: "Wrong Password",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div className="btns">
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign In
          </Button>
          <Link to={ROUTE_CONSTANTS.REGISTER}>Create Account</Link>
        </div>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
