import { clearUser } from "../store/authSlice";
import { clearSubjects } from "../store/subjectSlice";

export const clearStore = (dispatch) => {
  dispatch(clearUser());
  dispatch(clearSubjects());
};
