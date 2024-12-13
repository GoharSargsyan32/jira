import { useState, useEffect } from "react";
import { Button, Typography, Flex } from "antd";
import AddIssueModal from "../../components/sheard/IssueModal/Add";
import { useSelector, useDispatch } from "react-redux";
import { fetchIssuesDate, changeIssueColumns } from "../../state-managment/slices/issues";
import EditIssueModal from "../../components/sheard/IssueModal/Edit";
import LoadingWrapper from "../../components/sheard/LoadingWrapper/index";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ISSUE_OPTIONS } from "../../core/utils/issues";
import { db } from "../../services/firbase";
import { updateDoc, doc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../core/utils/constants"; 
import { taskStatuses } from "../../core/utils/issues";
import "./index.css";

const { Title, Text } = Typography;

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

  const handleChangeTaskStatus = async (result) => {
    if (result.destination) {
      const {destination, source} = result;
      try {
        dispatch(changeIssueColumns({source, destination}));
        const docRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, result.draggableId);
        await updateDoc(docRef, {
          status: destination.droppableId
        });
      } catch {
        console.log("Error Drag");
      }
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Create Issue
      </Button>

      {Boolean(editModalData) && (
        <EditIssueModal
          data={editModalData}
          isOpen={Boolean(editModalData)}
          onClose={() => setEditModalData(null)}
        />
      )}

      <AddIssueModal onClose={handleClose} isOpen={showModal} />

      <div className="drag_contex_container">
        <LoadingWrapper loading={isLoading}>
          <DragDropContext onDragEnd={handleChangeTaskStatus}>
            {Object.entries(data).map(([columnId, column]) => {
              return (
                <div className="column_container" key={columnId}>
                  <div className="column_header">
                    <Title level={5} type="secondary">
                      {taskStatuses[columnId].title} 
                      {" "}
                      ({column.length})
                    </Title>
                  </div>

                  <div>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="droppable_container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {column.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.taskId}
                                  draggableId={item.taskId}
                                  git
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className="issue_card_container"
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={()=>{setEditModalData(item)}}
                                        ref={provided.innerRef}
                                      >
                                        <Flex justify="space-between">
                                          <Text>
                                            {item.IssueName}
                                            </Text>

                                          <div>
                                            {ISSUE_OPTIONS[item.type]?.icon}
                                            </div>
                                        </Flex>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </LoadingWrapper>
      </div>
    </div>
  );
};

export default Cabinet;
