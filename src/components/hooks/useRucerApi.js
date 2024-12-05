import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config/axiosInstance";

export const useRucerApi = () => {
  const [tours, setTours] = useState([]);

  const getAllTours = async () => {
    try {
      const { data } = await axiosInstance.get("/menu");

      toast.success("Успешно получено");
      setTours(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllTours();
  }, []);

  return [tours, setTours];
};
