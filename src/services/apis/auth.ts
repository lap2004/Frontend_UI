import { restTransport } from "@/src/lib/api";

const { post, get } = restTransport();

export const userLogin = async (body: any) => {
  return await post("/auth/login", body);
};

export const userMe = async (body: any) => {
  return await get("/auth/me", body);
};

export const Protected = async (body: any) => {
  return await get("/users/protected", body);
};
