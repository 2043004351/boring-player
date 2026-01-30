import request from "../utils/request";

export const getList = (listId, params) => {
  return request(`/list/${listId}`, {
    method: "GET",
    params
  });
};
