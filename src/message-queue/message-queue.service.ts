import { Inject, Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { Channel, Connection, ConsumeMessage } from 'amqplib';
import * as Buffer from 'buffer';

@Injectable()
export class MessageQueueService {
  private connection: Connection;
  private channel: Channel;
  private readonly amqpUrl: string;

  constructor(@Inject('AMQP_URL') amqpUrl: string) {
    this.amqpUrl = amqpUrl;
  }

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.amqpUrl);
    this.connection.on('close', () => {
      console.log('[INFO] amqp connection is closed: reconnecting');
      this.connect();
    });
  }

  async assert(queueName: string): Promise<void> {
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(queueName, { durable: true });
    await this.channel.prefetch(1);
  }

  async consume(
    queueName: string,
    onMessage: (message: ConsumeMessage | null) => void,
  ) {
    if (!this.connection) await this.connect();
    return await this.channel.consume(queueName, onMessage);
  }

  async sendMessage(queueName: string, content: Buffer) {
    if (!this.connection) await this.connect();
    return this.channel.sendToQueue(queueName, content, { deliveryMode: true });
  }
}
