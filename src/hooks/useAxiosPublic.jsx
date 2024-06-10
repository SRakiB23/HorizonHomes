import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://horizon-homes-lilac.vercel.app",
});

const useAxiosPublic = () => {
  // axiosPublic.interceptors.request.use(
  //   function (config) {
  //     const token = localStorage.getItem("access-token");
  //     // console.log("request stopped by interceptors");
  //     config.headers.authorization = `Bearer ${token}`;
  //     return config;
  //   },
  //   function (error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   }
  // );
  return axiosPublic;
};

export default useAxiosPublic;
