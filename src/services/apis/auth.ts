import { restTransport } from "@/src/lib/api";


const { post, get, put } = restTransport();

export const userLogin = async (body: any) => {
  return await post("/auth/login", body);
};

export const userMe = async (body: any) => {
  return await get("/auth/me", body);
};

export const checkExistAccount = async (body: any) => {
  return await post("/user/checkExistAccount", body);
};

export const CreateAccount = async (body: any) => {
  return await post("/user/createAccount", body);
};

export const ChangePassword = async (body: any) => {
  return await put("/user/changeMyPassword", body);
};