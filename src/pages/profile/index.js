import { Button, Form, Input, notification, Upload } from "antd";
import { AuthContex } from "../../Context/authContextProvider";
import { useContext, useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { FIRESTORE_PATH_NAMES } from "../../core/utils/constants";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./index.css";

const Profile = () => {
  const { userProfileInfo, handleGetUsersData } = useContext(AuthContex);
  console.log(userProfileInfo);
  const [form] = Form.useForm();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { uid, ...restData } = userProfileInfo;

  useEffect(() => {
    form.setFieldsValue(restData);
  }, [form, restData]);

  const handleEditUserProfile = async (values) => {
    setButtonLoading(true);
    try {
      const userDocRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
      await updateDoc(userDocRef, values);
      handleGetUsersData(uid);
      notification.info({
        message: "User data successfully updated",
      });
    } catch (error) {
      notification.error({
        message: "Error",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="form_page_container">
      <Form layout="vertical" form={form} onFinish={handleEditUserProfile}>
        <Form.Item label="profile image">
          <Upload>
            
          </Upload>
        </Form.Item>

        <Form.Item
          label="FirstName"
          name="firstName"
          rules={[
            {
              required: true,
              message: "please input your firstname",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="lastName"
          name="lastName"
          rules={[
            {
              required: true,
              message: "please input your lastname",
            },
          ]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input readOnly placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "please input your phoneNumber",
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={buttonLoading}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
