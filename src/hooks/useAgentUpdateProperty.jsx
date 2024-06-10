import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAgentUpdateProperty = (id) => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: property = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/properties/${id}`);
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch property");
      }
    },
  });

  return { property, isLoading, isError, refetch };
};

export default useAgentUpdateProperty;
