const BASE_URL = process.env.REACT_APP_END_POINT;
export const fetchApi = async (url, options) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, options);
    const result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
};
