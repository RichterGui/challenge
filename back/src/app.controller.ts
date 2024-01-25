import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('search-data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async postData(@Body() requestBody: any): Promise<any> {
    const { localidade, frequencia, keyword, scrapResult } = requestBody;
    return this.appService.postData(
      localidade,
      frequencia,
      keyword,
      scrapResult,
    );
  }
}
