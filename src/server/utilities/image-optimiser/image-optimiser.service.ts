import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { readFileSync, existsSync } from 'fs';

import * as sharp from 'sharp';
import { join } from 'path';
import { Response } from 'express';
import { ImageOptimiserCache } from './image-optimiser-cache';

const AVIF = 'image/avif';
const WEBP = 'image/webp';
const PNG = 'image/png';
const JPEG = 'image/jpeg';
const GIF = 'image/gif';
const SVG = 'image/svg+xml';

@Injectable()
export class ImageOptimiserService {
  private imageOptimiserCache?: ImageOptimiserCache;
  private distDir = join(process.cwd(), 'upload');

  async optimiseImage(queryParams: any): Promise<any> {
    const validation = this.validateQueryParams(queryParams);
    if ('errorMessage' in validation) {
      throw new BadRequestException(validation.errorMessage);
    }
    const { url, q: quality, w: width } = queryParams;

    const cacheKey = ImageOptimiserCache.getCacheKey({ url, quality, width });

    //
    this.imageOptimiserCache = new ImageOptimiserCache({
      distDir: this.distDir,
    });
    const cachedResponse = await this.imageOptimiserCache.get(cacheKey);

    if (cachedResponse) {
      return {
        buffer: cachedResponse.buffer,
        contentType: WEBP,
        maxAge: 2592000, // 30 days
      };
    }

    const imageURL = join(this.distDir, url);
    let upstreamBuffer = this.readImageFromDir(imageURL);
    let optimisedBuffer: Buffer = null;
    const contentType = this.getBufferType(upstreamBuffer);

    const transformer = sharp(upstreamBuffer);

    transformer.rotate();

    const { width: metaWidth } = await transformer.metadata();

    if (metaWidth && metaWidth > parseInt(width)) {
      transformer.resize(parseInt(width));
    }

    transformer.webp({ quality: parseInt(quality, 10) });

    optimisedBuffer = await transformer.toBuffer();

    await this.imageOptimiserCache.set(cacheKey, {
      buffer: optimisedBuffer,
      extension: contentType.split('/')[1],
    });

    return {
      buffer: optimisedBuffer,
      contentType: WEBP,
      maxAge: 2592000, // 30 days
    };
  }

  sendResponse(
    res: Response,
    buffer: Buffer,
    maxAge: number,
    contentType: string
  ) {
    res.setHeader('Vary', 'Accept');
    res.setHeader(
      'Cache-Control',
      `public, max-age=${maxAge}, must-revalidate`
    );
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', Buffer.byteLength(buffer));
    res.end(buffer);
  }

  private readImageFromDir(url: string): Buffer {
    try {
      return readFileSync(url);
    } catch (err) {
      if (!existsSync(url)) {
        throw new NotFoundException();
      }

      throw err;
    }
  }

  private validateQueryParams(queryParams: any) {
    const { url, w, q } = queryParams;
    if (!url) {
      return { errorMessage: '"url" parameter is required' };
    }
    if (!w) {
      return { errorMessage: '"w" parameter (width) is required' };
    }
    if (!q) {
      return { errorMessage: '"q" parameter (quality) is required' };
    }

    const width = parseInt(w, 10);

    if (width <= 0 || isNaN(width)) {
      return {
        errorMessage: '"w" parameter (width) must be a number greater than 0',
      };
    }

    const quality = parseInt(q);

    if (isNaN(quality) || quality < 1 || quality > 100) {
      return {
        errorMessage:
          '"q" parameter (quality) must be a number between 1 and 100',
      };
    }

    return { status: 'ok' };
  }

  private getBufferType(buffer: Buffer) {
    if ([0xff, 0xd8, 0xff].every((b, i) => buffer[i] === b)) {
      return JPEG;
    }
    if (
      [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
        (b, i) => buffer[i] === b
      )
    ) {
      return PNG;
    }
    if ([0x47, 0x49, 0x46, 0x38].every((b, i) => buffer[i] === b)) {
      return GIF;
    }
    if (
      [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50].every(
        (b, i) => !b || buffer[i] === b
      )
    ) {
      return WEBP;
    }
    if ([0x3c, 0x3f, 0x78, 0x6d, 0x6c].every((b, i) => buffer[i] === b)) {
      return SVG;
    }
    if (
      [0, 0, 0, 0, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66].every(
        (b, i) => !b || buffer[i] === b
      )
    ) {
      return AVIF;
    }
    return null;
  }
}
