import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";

export interface SmsJobData {
  phone: string;
  message: string;
}

@Injectable()
export class SmsQueue {
  constructor(@InjectQueue("sms") private readonly queue: Queue) {}

  async sendOtp(phone: string, code: string): Promise<void> {
    await this.queue.add("send", {
      phone,
      message: `Ваш код: ${code}. Дійсний 5 хвилин. Auto Service.`,
    } satisfies SmsJobData);
  }

  async sendBookingConfirmation(
    phone: string,
    bookingId: string,
    serviceType: string,
    scheduledAt?: Date
  ): Promise<void> {
    const dateStr = scheduledAt
      ? scheduledAt.toLocaleDateString("uk-UA")
      : "найближчий час";
    await this.queue.add("send", {
      phone,
      message: `Ваш запис #${bookingId.slice(0, 8)} прийнято. ${serviceType}, ${dateStr}. Auto Service.`,
    } satisfies SmsJobData);
  }
}
