import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const response = {
      title: 'Welcome to SGP-API - Product Management API',
      description: 'This is a simple API for managing products.',
    };
    return JSON.stringify(response);
  }
}
