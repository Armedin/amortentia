import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: any;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/client',
      });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): any {
    return this.server;
  }
}
