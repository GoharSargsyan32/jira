import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { Form, Button, Input, notification } from "antd";
import { regexpValidation } from "../../../core/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import AuthWrapper from "../../../components/share/AuthWrapper";
import loginBunner from "../../../core/images/login.jpg";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(ROUTE_CONSTANTS.LOGIN);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper title="Sign Up" bunner={loginBunner}>
      <Form
        className="form"
        layout="vertical"
        form={form}
        onFinish={handleRegister}
      >
        <h1>Registration</h1>
        <Form.Item
          label="First Name"
          name="firtName"
          rules={[
            {
              required: true,
              message: "Please input your FirstName",
            },
          ]}
        >
          <Input type="text" placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your LastName",
            },
          ]}
        >
          <Input type="text" placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email",
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
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

        <Form.Item
          label="Config Password"
          name="config"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
            ({getFieldValue}) => ({
              validator(_,value) {
                if(!value || getFieldValue("password")===value) {
                    return Promise.resolve();
                }

                return Promise.reject(new Error("the new password that u entered do not match"));
              }

            })
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <div className="btns">
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
          <Link to={ROUTE_CONSTANTS.LOGIN}>Sign In</Link>
        </div>
      </Form>
    </AuthWrapper>
  );
};
export default Register;

// class Register extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       loading: false,
//     };
//   }

//   handleChangeInput = (e) => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleRegister = async (e) => {
//     e.preventDefault();
//     this.setState({
//       loading: true,
//     });

//     const { email, password } = this.state;
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//     } catch {

//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   };
//   render() {
//     const { loading } = this.state;
//     return (
//       <div className="auth_container">
//         <Form layout="vertical" onSubmit={this.handleRegister}>
//           <Form.Item label="First Name">
//             <Input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               onChange={this.handleChangeInput}
//             />
//           </Form.Item>

//           <Form.Item label="Last Name">
//             <Input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               onChange={this.handleChangeInput}
//             />
//           </Form.Item>

//           <Form.Item label="Email">
//             <Input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={this.handleChangeInput}
//             />
//           </Form.Item>

//           <Form.Item label="Password">
//             <Input.Password
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={this.handleChangeInput}
//             />
//           </Form.Item>

//           <Button type="primary" onClick={this.handleRegister} loading={loading}>Register</Button>
//         </Form>
//       </div>
//     );
//   }
// }
