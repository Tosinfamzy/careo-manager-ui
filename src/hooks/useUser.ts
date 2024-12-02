import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";
import axiosClient from "../utils/axiosClient";

interface DecodedToken {
  sub: string;
  [key: string]: unknown;
}

interface User {
  id: string;
  name: string;
  email: string;
  tasks: Task[];
}

const fetchUserById = async (userId: string): Promise<User> => {
  const response = await axiosClient.get(
    `${import.meta.env.VITE_API_URL}/users/${userId}`
  );
  return response.data;
};

const useUser = (token: string) => {
  const decodedToken: DecodedToken = jwtDecode(token);
  const userId = decodedToken.sub;

  return useQuery({ queryKey: ["user"], queryFn: () => fetchUserById(userId) });
};

export default useUser;
