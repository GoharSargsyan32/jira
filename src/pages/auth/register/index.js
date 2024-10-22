import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../services/firebase";
import { Form, Button, Input, notification } from "antd";
import { regexpValidation } from "../../../core/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import AuthWrapper from "../../../components/share/AuthWrapper";
import loginBunner from "../../../core/images/login.jpg";
import { setDoc, doc } from "firebase/firestore";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    const { firstName, lastName, email, password } = values;

    try {
      const response = await createUserWithEmailAndPassword(auth, email,password);
      const {uid} = response.user;
      const createDoc = doc(db,"registerUser",uid);
      await setDoc(createDoc, {
        uid,firstName,lastName,email
      });
      console.log(uid);
      // await signInWithEmailAndPassword(auth, email, password);
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
          name="firstName"
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


