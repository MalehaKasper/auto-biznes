import { Global, Module } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { InternalStorageController } from "./internal-storage.controller";

@Global()
@Module({
  controllers: [InternalStorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
