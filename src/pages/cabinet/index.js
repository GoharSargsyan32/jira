import { useState, useEffect } from "react";
import { Button } from "antd";
import AddIssueModal from "../../components/sheard/IssueModal/Add";
import { useSelector, useDispatch } from "react-redux";
import { fetchIssuesDate } from "../../state-managment/slices/issues";
import EditIssueModal from "../../components/sheard/IssueModal/Edit";
import "./index.css";

const Cabinet = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useSelector((store) => store.issues);
  const [editModalData, setEditModalData] = useState(null);
  console.log(data);

  console.log(editModalData);


  useEffect(() => {
    dispatch(fetchIssuesDate());
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };



  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Create Issue
      </Button>

      {
        Boolean(editModalData) && (
        <EditIssueModal 
        data={editModalData} 
        isOpen={Boolean(editModalData)} 
        onClose={()=>setEditModalData(null)}
      />
        )
      }      

      <AddIssueModal 
        onClose={handleClose} 
        isOpen={showModal} 
      />

      <div className="board_container">
        <ul>
          {
            data.map((item) => {
              return (
                <li key={item.taskId} onClick={()=>setEditModalData(item)}>
                  {item.IssueName}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default Cabinet;
