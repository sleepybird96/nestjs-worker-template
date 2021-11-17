import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerService {
  constructor() {
    this.initialize();
    this.work();
  }

  work() {
    console.log('[INFO] worker start work!!');
  }

  private initialize() {
    console.log('[INFO] worker prepare for work');
  }
}
