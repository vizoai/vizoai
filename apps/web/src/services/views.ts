import { request } from "./_request";

export async function getViews() {
  const { data: res } = await request.get<{ views: number }>("auth/view");
  return res?.views || 0;
}

export async function updateView() {
  return await request.post("auth/view");
}
