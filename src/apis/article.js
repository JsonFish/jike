import request from "@/utils/request";

// 获取频道
export const getChannelRequest = () => {
  return request({
    method: "GET",
    url: "/channels",
  });
};

// 新增文章信息
export const addArticleRequest = (data) => {
  return request({
    method: "POST",
    url: "/mp/articles?draft=false",
    data,
  });
};

// 获取文章列表
export const getArticleListRequest = (params) => {
  return request({
    method: "GET",
    url: "/mp/articles",
    params,
  });
};
