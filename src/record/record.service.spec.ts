import { Test, TestingModule } from '@nestjs/testing';
import { RecordService } from './record.service';
import { RecordModule } from './record.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AddRecordDto } from './dto/record.dto';
import { RecordSchema } from './record.schema';
import 'dotenv/config';

describe('RecordService', () => {
  let service: RecordService;
  const recordDto: AddRecordDto = {
    name: 'Nitish',
    gender: 'male',
    email: 'service2@eazydiner.com',
    mobile: '+911233123121',
    technologies: '| C++ | Javascript | ',
    profile: 'pic5.jpeg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        }),
        MongooseModule.forFeature([{ name: 'Record', schema: RecordSchema }]),
        RecordModule,
      ],
      providers: [RecordService],
    }).compile();

    service = module.get<RecordService>(RecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should not create User with falsy params', async () => {
      expect.assertions(4);
      try {
        await service.addRecord(null);
      } catch (error) {
        error = error as Error;
        expect(error.name).toEqual('ValidationError');
        expect(error.errors).not.toBeNull();
        expect(error.errors.email).not.toBeNull();
        expect(error.errors.password).not.toBeNull();
      }
    });

    it('should create a new Record', async () => {
      const user = await service.addRecord(recordDto);
      expect(user).not.toBeNull();
      expect(user.name).toEqual(recordDto.name);
      expect(user.gender).toEqual(recordDto.gender);
      expect(user.email).toEqual(recordDto.email);
      expect(user.mobile).toEqual(recordDto.mobile);
      expect(user.profile).toEqual(recordDto.profile);
    });
  });

  it('should list Users', async () => {
    const users = await service.getAllRecords();
    expect(users.length).toBe(7); // because some records were already in DB
  });
});
