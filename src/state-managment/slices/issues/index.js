import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../services/firbase";
import { getDocs, collection } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../core/utils/constants";
import { transformIssueData } from "../../../core/helpers/transformissueData";

const initialState = {
  data: {},
  isLoading: false,
};

export const fetchIssuesDate = createAsyncThunk("data/fetchData", async () => {
  const queryData = await getDocs(collection(db, FIRESTORE_PATH_NAMES.ISSUES));

  const resultData = queryData.docs.map((doc) => {
    return doc.data();
  })

  return transformIssueData(resultData);
  
});

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (promise) => {
    promise
      .addCase(fetchIssuesDate.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchIssuesDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchIssuesDate.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});

export default issueSlice.reducer;
