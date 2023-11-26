import { join } from 'path';
import { promises } from 'fs';
import { createHash } from 'crypto';

async function writeToCacheDir(
  dir: string,
  extension: string,
  maxAge: number,
  expireAt: number,
  buffer: Buffer
) {
  const filename = join(dir, `${maxAge}.${expireAt}.${extension}`);

  if ((promises as any).rm) {
    await (promises as any)
      .rm(dir, { force: true, recursive: true })
      .catch(() => {});
  } else {
    await promises.rmdir(dir, { recursive: true }).catch(() => {});
  }
  await promises.mkdir(dir, { recursive: true });
  await promises.writeFile(filename, buffer);
}

export class ImageOptimiserCache {
  private cacheDir: string;

  constructor({ distDir }: { distDir: string }) {
    this.cacheDir = join(distDir, 'cache');
  }

  static getCacheKey({
    url,
    width,
    quality,
    mimeType = 'image/webp',
  }: {
    url: string;
    width: number;
    quality: number;
    mimeType?: string;
  }): string {
    const hash = createHash('sha256');
    for (let item of [url, width, quality, mimeType]) {
      if (typeof item === 'number') hash.update(String(item));
      else {
        hash.update(item);
      }
    }

    return hash.digest('base64').replace(/\//g, '-');
  }

  async get(cacheKey: string) {
    try {
      const cacheDir = join(this.cacheDir, cacheKey);
      const files = await promises.readdir(cacheDir);
      const now = Date.now();

      for (const file of files) {
        const [maxAgeStr, expireAtStr, extension] = file.split('.');
        const expireAt = Number(expireAtStr);
        const maxAge = Number(maxAgeStr);
        const buffer = await promises.readFile(join(cacheDir, file));

        return {
          buffer,
          expireAt,
          maxAge,
          extension,
        };
      }
    } catch (_) {}

    return null;
  }

  async set(cacheKey: string, value: any) {
    const expireAt = 2592000 * 1000 + Date.now();
    const maxAge = 2592000;
    try {
      await writeToCacheDir(
        join(this.cacheDir, cacheKey),
        value.extension,
        maxAge,
        expireAt,
        value.buffer
      );
    } catch (err) {
      console.error(`Failed to write image to cache ${cacheKey}`, err);
    }
  }
}
