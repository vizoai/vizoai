"use client";

import { useRequest, useMount } from "ahooks";
import { getViews, updateView } from "../../services/views";

export function Views() {
  const { data: views, refreshAsync } = useRequest(getViews, { manual: true });

  useMount(async () => {
    await updateView();
    await refreshAsync();
  });

  return <div>Views: {views}</div>;
}
