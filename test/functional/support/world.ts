import { World } from '@cucumber/cucumber';
import { AppModule } from '../../../src/app.module';
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';

export class CustomWorld extends World {
  app: any;
  constructor(options) {
    super(options);
  }

  async initNestApp() {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = module.createNestApplication();
    // app.useGlobalPipes(new ValidationPipe());

    await app.init();
    this.app = app;
  }
}
