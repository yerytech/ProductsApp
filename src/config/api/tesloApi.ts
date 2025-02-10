import axios from "axios";
import { Platform } from "react-native";
const {
  EXPO_PUBLIC_STAGE,
  EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_API_URL_IOS,
  EXPO_PUBLIC_API_URL_ANDROID,
} = process.env;

export const API_URL =
  EXPO_PUBLIC_STAGE === "prod"
    ? EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
    ? EXPO_PUBLIC_API_URL_IOS
    : EXPO_PUBLIC_API_URL_ANDROID;

const tesloApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
 
// ! TODO interceptors 


export {
  tesloApi,
}