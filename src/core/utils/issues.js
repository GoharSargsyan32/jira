import { BugOutlined, FlagOutlined, CheckSquareOutlined } from "@ant-design/icons";

const ISSUE_TYPES = {
  BUG: "bug",
  TASK: "task",
  STORY: "story"
};

const ISSUE_PRIORITY = {
  HiGHEST: "Highest",
  HIGH: "High",
  LOW: "Low",
  LOWEST: "Lowest",
  MEDIUM: "Medium",
};

export const ISSUE_OPTIONS = {
  [ISSUE_TYPES.BUG]: {
    label: "Bug",
    value: ISSUE_TYPES.BUG,
    icon: <BugOutlined style={{ color:"#e44d42" }}/>,
  },

  [ISSUE_TYPES.TASK]: {
    label: "Task",
    value: ISSUE_TYPES.TASK,
    icon: <CheckSquareOutlined style={{ color: "#4fade6" }}/>,
  },

  [ISSUE_TYPES.STORY]: {
    label: "Story",
    value: ISSUE_TYPES.STORY,
    icon: <FlagOutlined style={{ color: "#65ba43" }} />,
  },
};

export const ISSUE_PRIORITY_OPTIONS = {
  [ISSUE_PRIORITY.HiGHEST]: {
    label: "Highest",
    value: ISSUE_PRIORITY.HiGHEST,
  },
  [ISSUE_PRIORITY.HIGH]: {
    label: "High",
    value: ISSUE_PRIORITY.HiGH,
  },
  [ISSUE_PRIORITY.LOW]: {
    label: "Low",
    value: ISSUE_PRIORITY.LOW,
  },
  [ISSUE_PRIORITY.LOWEST]: {
    label: "Lowest",
    value: ISSUE_PRIORITY.LOWEST,
  },
  [ISSUE_PRIORITY.MEDIUM]: {
    label: "Medium",
    value: ISSUE_PRIORITY.MEDIUM,
  },
};
