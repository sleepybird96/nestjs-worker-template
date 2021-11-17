import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { types } from 'pg';

async function bootstrap() {
  await NestFactory.create(WorkerModule);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  types.setTypeParser(20, (val: string) => {
    return parseInt(val);
  });
}
bootstrap();
