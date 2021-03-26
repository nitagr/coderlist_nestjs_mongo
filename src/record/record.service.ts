import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Record } from './interface/record.interface';
import { AddRecordDto } from './dto/record.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel('Record') private readonly recordModel: Model<Record>,
  ) {}

  async addRecord(addRecordDto: AddRecordDto): Promise<Record> {
    const record: Record = await new this.recordModel(addRecordDto);
    return record.save();
  }
}
