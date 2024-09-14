import { request } from "./_request";

export async function getConfig() {
  const res = await request.get<unknown>("config/all");
  return res.data as any;
}
