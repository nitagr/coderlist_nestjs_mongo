import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Record } from './interface/record.interface';
import { AddRecordDto, UpdateRecordDto } from './dto/record.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel('Record') private readonly recordModel: Model<Record>,
  ) {}

  // service for adding a record
  async addRecord(addRecordDto: AddRecordDto): Promise<Record> {
    const record: Record = await new this.recordModel(addRecordDto);
    return record.save();
  }

  // service for retrieving all records
  async getAllRecords(): Promise<Record[]> {
    const allRecords: Record[] = await this.recordModel.find();
    return allRecords;
  }

  // service for deleting a record by its ID
  async deleteRecordById(id: string): Promise<Record> {
    const record: Record = await this.recordModel.findByIdAndRemove(id);
    return record;
  }

  // service for updating a user record
  async updateRecordById(
    id: string,
    updateRecordDto: UpdateRecordDto,
  ): Promise<Record> {
    const record: Record = await this.recordModel.findByIdAndUpdate(
      id,
      updateRecordDto,
    );
    return record;
  }

  // service for deleting a record by its ID
  async findRecordById(id: string): Promise<Record> {
    const record: Record = await this.recordModel.findById(id);
    return record;
  }
}
