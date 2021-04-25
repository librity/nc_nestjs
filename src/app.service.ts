import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

// Using express request isn't recommended:
// It'll make it harder to switch to fastify later
@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  home() {
    return {
      message: 'Welcome to Nest Movies 1.0!',
      headers: this.request.headers,
      method: this.request.method,
      hostname: this.request.hostname,
      ip: this.request.ip,
      url: this.request.url,
    };
  }
}
