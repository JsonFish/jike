import { createSlice } from "@reduxjs/toolkit";
import { loginRequest, getUserInfoRequest } from "@/apis/user";
import router from "@/router";
import { getToken, setToken as _setToken, removeToken } from "@/utils/token";
const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearToken(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUserInfo, clearToken } = userStore.actions;
const userReducer = userStore.reducer;
// 异步登录请求获取token

const loginReq = (loginForm) => {
  return async (dispatch) => {
    const req = await loginRequest(loginForm);
    if (req.data && req.data.token) {
      // 保存token
      dispatch(setToken(req.data.token));
      // 跳转首页
      router.navigate("/");
    } else {
      return Promise.reject(req.data.message);
    }
  };
};
const getUserInfo = () => {
  return async (dispatch) => {
    const req = await getUserInfoRequest();
    if (req.data) {
      dispatch(setUserInfo(req.data));
    }
  };
};

export { setToken, loginReq, clearToken, getUserInfo };
export default userReducer;
