import { Injectable, Logger } from "@nestjs/common";
import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  readonly client: S3Client | null = null;
  readonly bucketName: string | null = null;
  readonly publicUrl: string | null = null;

  constructor() {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;
    const publicUrl = process.env.R2_PUBLIC_URL;

    if (accountId && accessKeyId && secretAccessKey && bucketName) {
      this.client = new S3Client({
        region: "auto",
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: { accessKeyId, secretAccessKey },
      });
      this.bucketName = bucketName;
      this.publicUrl = publicUrl ?? null;
      this.logger.log("R2 storage initialized");
    } else {
      this.logger.warn(
        "R2 storage not configured — photo upload unavailable",
      );
    }
  }

  async getPresignedUploadUrl(key: string, contentType: string): Promise<string> {
    if (!this.client || !this.bucketName) {
      throw new Error("R2 storage not configured");
    }
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });
    return getSignedUrl(this.client, command, { expiresIn: 300 });
  }

  async deleteObject(key: string): Promise<void> {
    if (!this.client || !this.bucketName) {
      throw new Error("R2 storage not configured");
    }
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucketName, Key: key }),
    );
  }

  getPublicUrl(key: string): string {
    const base = this.publicUrl ?? "";
    return `${base}/${key}`;
  }
}
