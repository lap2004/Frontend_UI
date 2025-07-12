import { getstats } from "../apis/admin";
import { useGetAPI } from "./hookApi";

const useGetStats = () => {
  const { loading, get: getGetStats, error, setError } = useGetAPI(getstats);
  return {
    loading,
    getGetStats,
    error,
    setError,
  };
};

export { useGetStats};
