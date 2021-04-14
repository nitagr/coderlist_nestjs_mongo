import { Test, TestingModule } from '@nestjs/testing';
import { RecordService } from './record.service';
import { RecordModule } from './record.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

describe('RecordService', () => {
  let service: RecordService;

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

    service = module.get<RecordService>(RecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
