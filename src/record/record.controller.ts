import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Put,
  Body,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { RecordService } from './record.service';
import { Record } from './interface/record.interface';
import { AddRecordDto, FindOneParams, UpdateRecordDto } from './dto/record.dto';
import * as dotenv from 'dotenv';
import { diskStorage } from 'multer';
import { Express } from 'express';
import {
  customFileName,
  profileTypeFilter,
} from './utils/profile-upload.utils';

dotenv.config();

@Controller('record')
export class RecordController {
  constructor(private recordService: RecordService) {}

  // API for adding a record of user
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: customFileName,
      }),
      fileFilter: profileTypeFilter,
    }),
  )
  async addRecord(
    @Res() res,
    @Body() addRecordDto: AddRecordDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    addRecordDto.profile = file.originalname;
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

  // API for deleting a todo by its Id
  @Delete(':id')
  async deleteRecordById(@Res() res, @Param() params: FindOneParams) {
    const record: Record = await this.recordService.deleteRecordById(params.id);
    if (!record) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    }

    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'success!',
    });
  }

  // API for updating record by its Id
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: customFileName,
      }),
      fileFilter: profileTypeFilter,
    }),
  )
  async updateRecordById(
    @Res() res,
    @Body() updateRecordDto: UpdateRecordDto,
    @UploadedFile() file: Express.Multer.File,
    @Param() params: FindOneParams,
  ) {
    updateRecordDto.profile = file.originalname;
    const record: Record = await this.recordService.updateRecordById(
      params.id,
      updateRecordDto,
    );
    if (!record) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    }

    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'success!',
    });
  }
}
