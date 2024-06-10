import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useWishlistId = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: wishlist = {},
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      const res = await axiosPublic.get(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  return [wishlist, loading, refetch];
};

export default useWishlistId;
