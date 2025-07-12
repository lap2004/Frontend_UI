import { restTransport } from "@/src/lib/api";

const { get } = restTransport();

export const getstats = async (body: any) => {
  return await get("/admin/stats", body);
};