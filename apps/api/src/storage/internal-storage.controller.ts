import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  ServiceUnavailableException,
  UnauthorizedException,
  Headers,
} from "@nestjs/common";
import { StorageService } from "./storage.service";

class UploadUrlDto {
  key: string;
  contentType: string;
}

class DeleteObjectDto {
  key: string;
}

@Controller("internal/storage")
export class InternalStorageController {
  constructor(private readonly storage: StorageService) {}

  private checkKey(internalKey: string | undefined) {
    const expected = process.env.INTERNAL_API_KEY;
    if (!expected || internalKey !== expected) {
      throw new UnauthorizedException("Invalid or missing X-Internal-Key");
    }
  }

  @Post("upload-url")
  async getUploadUrl(
    @Headers("x-internal-key") internalKey: string,
    @Body() body: UploadUrlDto,
  ) {
    this.checkKey(internalKey);
    if (!this.storage.client) {
      throw new ServiceUnavailableException("R2 storage not configured");
    }
    const presignedUrl = await this.storage.getPresignedUploadUrl(body.key, body.contentType);
    const publicUrl = this.storage.getPublicUrl(body.key);
    return { presignedUrl, publicUrl };
  }

  @Delete("object")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteObject(
    @Headers("x-internal-key") internalKey: string,
    @Body() body: DeleteObjectDto,
  ) {
    this.checkKey(internalKey);
    if (!this.storage.client) {
      throw new ServiceUnavailableException("R2 storage not configured");
    }
    await this.storage.deleteObject(body.key);
  }
}
