import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  avoidDefaultRoute(@Res() res: Response): void {
    res.redirect('/api');
  }
}
