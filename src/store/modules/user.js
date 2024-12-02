import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils/request";
import { getToken, setToken as _setToken } from "@/utils/token";
const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
  },
});

const { setToken } = userStore.actions;
const userReducer = userStore.reducer;
// 异步登录请求获取token
const loginReq = (loginForm) => {
  return async (dispatch) => {
    const req = await request.post("/authorizations", loginForm);
    if (req.data && req.data.token) {
      dispatch(setToken(req.data.token));
    } else {
      return Promise.reject(req.data.msg);
    }
  };
};

export { setToken, loginReq };
export default userReducer;
