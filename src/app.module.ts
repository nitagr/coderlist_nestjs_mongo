import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordModule } from './record/record.module';

@Module({
  imports: [RecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
