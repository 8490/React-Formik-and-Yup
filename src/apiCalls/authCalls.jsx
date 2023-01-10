import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";

const BASE_URL = "https://clarusway.pythonanywhere.com/";

export const login = async (userInfo) => {
  const dispatch = useDispatch();

  try {
    dispatch(fetchStart());
    const { data } = await axios.post(
      `${BASE_URL}account/auth/login/`,
      userInfo
    );
    dispatch(loginSuccess());
    return data;
  } catch (error) {
    console.log(error);
    dispatch(fetchFail);
  }
};
