import { Module } from '@nestjs/common';
import { ImageOptimiserController } from './image-optimiser.controller';
import { ImageOptimiserService } from './image-optimiser.service';

@Module({
  providers: [ImageOptimiserService],
  exports: [ImageOptimiserService],
  controllers: [ImageOptimiserController],
})
export class ImageOptimiserModule {}
