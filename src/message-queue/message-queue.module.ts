import { DynamicModule, Module } from '@nestjs/common';
import { MessageQueueService } from './message-queue.service';

@Module({})
export class MessageQueueModule {
  static forRoot(amqpUrl: string): DynamicModule {
    return {
      module: MessageQueueModule,
      providers: [
        {
          provide: 'AMQP_URL',
          useValue: amqpUrl,
        },
        MessageQueueService,
      ],
      exports: [MessageQueueService],
    };
  }
}
