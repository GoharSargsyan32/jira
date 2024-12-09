import { useState } from "react";
import ModalForm from "../Form";
import { Modal, Form, notification } from "antd";
import { generateUID } from "../../../../core/helpers/generateUID";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../services/firbase";
import { FIRESTORE_PATH_NAMES } from "../../../../core/utils/constants";
import { useDispatch } from "react-redux";
import { fetchIssuesDate } from "../../../../state-managment/slices/issues";
import { taskStatuses } from "../../../../core/utils/issues";


const AddIssueModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleCreateIssue = async (values) => {
    setButtonLoading(true);
    const taskId = generateUID();

    const taskModel = {
      taskId,
      ...values,
      status: taskStatuses.TODO.key,
      date: new Date().toLocaleDateString(),
    };
    try {
      const createdDoc = doc(db, FIRESTORE_PATH_NAMES.ISSUES, taskId);
      await setDoc(createdDoc, taskModel);
      onClose();
      form.resetFields();
      notification.success({
        message: "Your task created",
      });
      dispatch(fetchIssuesDate());
    } catch {
      notification.error({
        message: "Error",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Create Issue"
      open={isOpen}
      width={600}
      onCancel={handleClose}
      centered
      okText="Create Issue"
      confirmLoading={buttonLoading}
      onOk={form.submit}
    >
      <ModalForm form={form} onFinish={handleCreateIssue} />
    </Modal>
  );
};

export default AddIssueModal;
