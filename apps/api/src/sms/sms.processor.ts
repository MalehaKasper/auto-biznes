import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { SmsService } from "./sms.service";
import { SmsJobData } from "./sms.queue";

@Processor("sms", {
  limiter: { max: 10, duration: 1000 },
})
export class SmsProcessor extends WorkerHost {
  private readonly logger = new Logger(SmsProcessor.name);

  constructor(private readonly smsService: SmsService) {
    super();
  }

  async process(job: Job<SmsJobData>): Promise<void> {
    const { phone, message } = job.data;
    this.logger.log(`Sending SMS to ${phone}`);
    await this.smsService.send(phone, message);
    this.logger.log(`SMS sent to ${phone}`);
  }
}
