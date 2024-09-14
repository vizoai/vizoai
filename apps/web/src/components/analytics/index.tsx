import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const inVercel = process.env.VERCEL === "1";

const Analytics = () => {
  return inVercel && <VercelAnalytics />;
};

export default Analytics;
