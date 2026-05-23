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
      ? scheduledAt.toLocaleString("uk-UA", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
      : "найближчий час";
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
    await this.queue.add("send", {
      phone,
      message: `Запис #${bookingId.slice(0, 8)} прийнято. ${serviceType}, ${dateStr}. Статус: ${siteUrl}/book/${bookingId}`,
    } satisfies SmsJobData);
  }

  async sendBookingConfirmed(phone: string, bookingId: string, scheduledAt: Date): Promise<void> {
    const dateStr = scheduledAt.toLocaleString("uk-UA", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
    await this.queue.add("send", {
      phone,
      message: `Ваш запис підтверджено на ${dateStr}. Слідкуйте: ${siteUrl}/book/${bookingId}. Auto Service.`,
    } satisfies SmsJobData);
  }

  async sendBookingCancelled(phone: string, notes?: string): Promise<void> {
    const detail = notes ? ` Причина: ${notes}` : "";
    await this.queue.add("send", {
      phone,
      message: `Ваш запис скасовано.${detail} Тел: ${process.env.COMPANY_PHONE ?? ""}. Auto Service.`,
    } satisfies SmsJobData);
  }

  async sendRaw(phone: string, message: string): Promise<void> {
    await this.queue.add("send", { phone, message } satisfies SmsJobData);
  }
}
