import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn, id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (data) => {
    data !== "dontshow" && setLoading(true);

    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const refetch = (data) => fetchData(data);

  return { data, loading, refetch };
};

export default useAppwrite;
