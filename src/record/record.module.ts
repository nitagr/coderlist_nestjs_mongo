import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordSchema } from './record.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Record', schema: RecordSchema }]),
    MulterModule.register({ dest: './images' }),
  ],
  providers: [RecordService],
  controllers: [RecordController],
  exports: [MongooseModule],
})
export class RecordModule {}
