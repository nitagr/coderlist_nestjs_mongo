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
import { imageFileName, profileTypeFilter } from './utils/profile-upload.utils';

dotenv.config();

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
  async updateRecordById(
    @Res() res,
    @Body() updateRecordDto: UpdateRecordDto,
    @Param() params: FindOneParams,
  ) {
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

  // API for retrieving images using profile image name
  @Get('getfile/:filename')
  getProfileImage(@Param('filename') image, @Res() res) {
    return res.sendFile(image, { root: './images' });
  }

  // API for user Profile Upload
  @Post('profile-upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: imageFileName,
      }),
      fileFilter: profileTypeFilter,
    }),
  )
  async addProfileImage(@Res() res, @UploadedFile() file: Express.Multer.File) {
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: 'success',
      data: file.originalname,
    });
  }
}
