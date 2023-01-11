import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const BASE_URL = "https://clarusway.pythonanywhere.com/";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userInfo) => {
    dispatch(fetchStart());

    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/stock");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Register can not be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());

    try {
      await axios.post(`${BASE_URL}account/auth/logout/`);
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  return { login, logout, register };
};

export default useAuthCalls;
