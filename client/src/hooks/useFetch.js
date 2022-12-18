import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_API_END_POINT;
const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/${url}`, options)
      .then((res) => res.json())
      .then((result) => {
        setResponse(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { response, error, isLoading };
};

export default useFetch;
