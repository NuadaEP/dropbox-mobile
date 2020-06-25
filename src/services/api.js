import axios from "axios";
import { BASE_URL } from "react-native-dotenv";

const api = axios.create({
  baseURL: `${BASE_URL}api/`,
});

export default api;
