import { Controller, Res, HttpStatus, Post, Body, Get } from '@nestjs/common';
import { RecordService } from './record.service';
import { Record } from './interface/record.interface';
import { AddRecordDto } from './dto/record.dto';

@Controller('record')
export class RecordController {
  constructor(private recordService: RecordService) {}

  // API for adding a record of user
  @Post()
  async addRecord(@Res() res, @Body() addRecordDto: AddRecordDto) {
    const record: Record = await this.recordService.addRecord(addRecordDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: 'success',
      data: record,
    });
  }

  //API for retrieving all records
  @Get()
  async getAllRecords(@Res() res) {
    const records: Record[] = await this.recordService.getAllRecords();
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'success',
      data: records,
    });
  }
}
