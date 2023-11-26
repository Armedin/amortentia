import { Controller, Get, Query, Res } from '@nestjs/common';
import { ImageOptimiserService } from './image-optimiser.service';
import { Response } from 'express';

@Controller('api/image')
export class ImageOptimiserController {
  constructor(private imageOptimiserService: ImageOptimiserService) {}

  @Get('')
  async getImage(@Query() query, @Res() res: Response) {
    const { buffer, contentType, maxAge } =
      await this.imageOptimiserService.optimiseImage(query);

    return this.imageOptimiserService.sendResponse(
      res,
      buffer,
      maxAge,
      contentType
    );
  }
}
