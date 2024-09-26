import { Module } from "@nestjs/common";
import { PluginController } from "./plugin.controller";
import { PluginService } from "./plugin.service";

@Module({
  controllers: [PluginController],
  providers: [PluginService],
})
export class PluginModule {}
