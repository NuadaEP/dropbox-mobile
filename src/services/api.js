import axios from "axios";
import { BASE_URL as baseURL } from "react-native-dotenv";

const api = axios.create({
  baseURL,
});

export default api;
