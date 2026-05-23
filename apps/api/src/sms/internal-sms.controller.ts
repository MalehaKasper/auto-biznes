import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  Headers,
} from "@nestjs/common";
import { SmsQueue } from "./sms.queue";

class SendSmsDto {
  phone: string;
  template: string;
  params: Record<string, string>;
}

@Controller("internal/sms")
export class InternalSmsController {
  constructor(private readonly smsQueue: SmsQueue) {}

  private checkKey(internalKey: string | undefined) {
    const expected = process.env.INTERNAL_API_KEY;
    if (!expected || internalKey !== expected) {
      throw new UnauthorizedException("Invalid or missing X-Internal-Key");
    }
  }

  private buildMessage(template: string, params: Record<string, string>): string {
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
    switch (template) {
      case "booking_confirmation":
        return `Запис #${params.bookingId?.slice(0, 8)} прийнято. ${params.serviceType}, ${params.date ?? "найближчий час"}. Статус: ${siteUrl}/book/${params.bookingId}`;
      case "booking_confirmed":
        return `Ваш запис підтверджено на ${params.date}. Слідкуйте: ${siteUrl}/book/${params.bookingId}. Auto Service.`;
      case "booking_cancelled":
        return `Ваш запис скасовано.${params.notes ? ` Причина: ${params.notes}` : ""} Тел: ${process.env.COMPANY_PHONE ?? ""}. Auto Service.`;
      default:
        throw new BadRequestException(`Unknown template: ${template}`);
    }
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async send(
    @Headers("x-internal-key") internalKey: string,
    @Body() body: SendSmsDto,
  ) {
    this.checkKey(internalKey);
    const message = this.buildMessage(body.template, body.params ?? {});
    await this.smsQueue.sendRaw(body.phone, message);
    return { queued: true };
  }
}
