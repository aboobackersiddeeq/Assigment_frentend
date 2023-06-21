import axios from "axios";
import { baseUrl } from "../constants/BaseURL";

// Create an Axios instance with the specified base URL
const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
