import { restTransport } from "@/src/lib/api";

const { post } = restTransport();

export const chatAdmin = async (body: any) => {
  return await post("/chat/admission", body);
};

export const chatStudent = async (body: any) => {
  return await post("/chat/student", body);
};
