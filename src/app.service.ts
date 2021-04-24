import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Sup dawg!';
  }

  getHi(): string {
    return 'HELLOOO';
  }

  postBad(): string {
    return 'BAD';
  }
}
