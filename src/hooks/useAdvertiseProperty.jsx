import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdvertiseProperty = () => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: properties = [],
    isPending: loading,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/propertiesadvertise");
      return res.data;
    },
  });

  return [properties, refetch, loading];
};

export default useAdvertiseProperty;
