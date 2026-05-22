import { Injectable, OnModuleInit, Logger } from "@nestjs/common";

@Injectable()
export class SmsService implements OnModuleInit {
  private readonly logger = new Logger(SmsService.name);

  onModuleInit() {
    if (!process.env.SMS_API_KEY) {
      throw new Error(
        "SMS_API_KEY environment variable is required but not set. Set it in .env"
      );
    }
  }

  async send(phone: string, message: string): Promise<void> {
    const provider = process.env.SMS_PROVIDER ?? "turbosms";

    if (provider === "turbosms") {
      await this.sendViaTurbosms(phone, message);
    } else {
      this.logger.warn(`Unknown SMS provider: ${provider}. Message not sent.`);
    }
  }

  private async sendViaTurbosms(phone: string, message: string): Promise<void> {
    const normalizedPhone = phone.replace("+", "");
    const response = await fetch("https://api.turbosms.ua/message/send.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipients: [normalizedPhone],
        sms: { sender: process.env.SMS_SENDER_NAME ?? "AutoService", text: message },
        token: process.env.SMS_API_KEY,
      }),
    });

    if (!response.ok) {
      throw new Error(`Turbosms API error: ${response.status}`);
    }

    const data = (await response.json()) as { response_code?: number };
    if (data.response_code !== 0) {
      throw new Error(`Turbosms send failed: ${JSON.stringify(data)}`);
    }
  }
}
