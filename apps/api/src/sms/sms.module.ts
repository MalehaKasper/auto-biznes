import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { SmsQueue } from "./sms.queue";
import { SmsProcessor } from "./sms.processor";
import { SmsService } from "./sms.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "sms",
    }),
  ],
  providers: [SmsQueue, SmsProcessor, SmsService],
  exports: [SmsQueue],
})
export class SmsModule {}
