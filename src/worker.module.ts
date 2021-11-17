import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [WorkerService],
})
export class WorkerModule {}
