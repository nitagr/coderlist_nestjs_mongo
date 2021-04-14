import { Test, TestingModule } from '@nestjs/testing';
import { RecordController } from './record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordModule } from './record.module';
import 'dotenv/config';

describe('RecordController', () => {
  let controller: RecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        }),
        RecordModule,
      ],
    }).compile();

    controller = module.get<RecordController>(RecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
