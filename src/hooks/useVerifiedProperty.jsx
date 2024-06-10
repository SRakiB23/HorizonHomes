// src/hooks/useVerifiedProperties.js

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useVerifiedProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: properti = [] } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properti`);
      // Filter out properties marked as fraud
      return res.data.filter((property) => property.fraud !== "fraud");
    },
  });

  return [properti, refetch];
};

export default useVerifiedProperties;
