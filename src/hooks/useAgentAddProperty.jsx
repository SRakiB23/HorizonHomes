// api, axios (axios secure), tan stack

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAgentAddProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: property = [] } = useQuery({
    queryKey: ["property", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property?email=${user.email}`);
      return res.data;
    },
  });

  return [property, refetch];
};

export default useAgentAddProperty;
