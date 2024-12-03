// 用户相关的所有请求
import { request } from "@/utils/request";

// 登录请求
export const loginRequest = (data) => {
  return request({
    method: "POST",
    url: "/authorizations",
    data,
  });
};
// 获取用户信息
export const getUserInfoRequest = () => {
  return request({
    method: "GET",
    url: "/user/profile",
  });
};
