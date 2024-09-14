import { Logger } from "@nestjs/common";

import { Vizo } from "./Vizo";

const logger = new Logger();

const run = async () => {
  const vizo = await Vizo.init();
  await vizo.run();
};

run().catch((e) => {
  logger.error(e);
  process.exit(1);
});
