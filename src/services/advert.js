import request from "@/utils/request";

// 获取所有广告列表
export const getAllAd = () => {
  return request({
    method: "GET",
    url: "/front/ad/getAdList",
  });
};

export const getAdbyid = (id) => {
  return request({
    method: "GET",
    url: "/front/ad/getAdById",
    params: {
      id,
    },
  });
};
export const createAd = (data) => {
  return request({
    method: "POST",
    url: "/front/ad/saveOrUpdate",
    data,
  });
};
// 获取所有广告位列表
export const getAllAdp = () => {
  return request({
    method: "GET",
    url: "/front/ad/space/getAllSpaces",
  });
};
export const getAdpbyid = (id) => {
  return request({
    method: "GET",
    url: "/front/ad/space/getSpaceById",
    params: {
      id,
    },
  });
};
export const createAdp = (data) => {
  return request({
    method: "POST",
    url: "/front/ad/space/saveOrUpdate",
    data,
  });
};
