import { useState, useEffect } from "react";
import { Button } from "antd";
import AddIssueModal from "../../components/sheard/IssueModal/Add";
import { useSelector, useDispatch } from "react-redux";
import { fetchIssuesDate } from "../../state-managment/slices/issues";


const Cabinet = () => {
const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {data, isLoading} = useSelector((store) => store.issues);
  console.log(data)
  console.log(isLoading)

  useEffect(() => {
    dispatch(fetchIssuesDate());
  }, []);



  const handleOpenModal = () => {
    setShowModal(true);
  }   

  const handleClose = () => {
    setShowModal(false);
  }  


  return (
    <div>
      <Button type="primary" onClick={handleOpenModal} >
        Create Issue
      </Button>

      <AddIssueModal onClose={handleClose} isOpen={showModal}/>
    </div>
  )
};

export default Cabinet;