import { Controller, Post, Body } from '@nestjs/common';
import { DialogService } from './dialog.service';


@Controller('dialog')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @Post('detect-intent')
  async detectIntent(@Body() body: { query: string }) {
    const sessionId = Math.random().toString(36).substring(7);;
    const response = await this.dialogService.detectIntent(body.query, sessionId);
    return response.queryResult.fulfillmentText;
  }
}
