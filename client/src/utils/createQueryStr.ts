export const createQueryStr = (
  queryObj: URLSearchParams,
  page?: number,
  limit?: number
) => {
  let urlStr = `?page=${page || 1}&${limit && `limit=${limit}&`}`;

  queryObj.forEach((value, key) => {
    urlStr += `${key}=${value}&`;
  });

  return urlStr.slice(0, urlStr.length - 1);
};
