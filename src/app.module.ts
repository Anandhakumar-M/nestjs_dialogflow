import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DialogModule } from './dialog/dialog.module';

@Module({
  imports: [DialogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
