import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ConfigModule } from '@nestjs/config';
import { MessageQueueModule } from './message-queue/message-queue.module';

@Module({
  imports: [ConfigModule.forRoot(), MessageQueueModule],
  providers: [WorkerService],
})
export class WorkerModule {}
