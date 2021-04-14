import { Test, TestingModule } from '@nestjs/testing';
import { RecordService } from './record.service';
import { RecordModule } from './record.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AddRecordDto, UpdateRecordDto } from './dto/record.dto';
import { RecordSchema } from './record.schema';
import 'dotenv/config';

describe('RecordService', () => {
  let service: RecordService;
  const recordDto: AddRecordDto = {
    name: 'Nitish',
    gender: 'male',
    email: 'service6@eazydiner.com',
    mobile: '+911233123121',
    technologies: '| C++ | Javascript | ',
    profile: 'pic5.jpeg',
  };

  const updateRecordDto: UpdateRecordDto = {
    name: 'Nitish updated 11',
    gender: 'male updated 11',
    email: 'service10upd@eazydiner.com',
    mobile: '+911233123121',
    technologies: '| C++ | Javascript | ',
    profile: 'pic5upd11.jpeg',
  };

  const idForRecordDeletion = '60772d3adb718931c7522059';
  const idForRecordUpdate = '60772e9370025b33ecadf722';

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
      expect(user.technologies).toEqual(recordDto.technologies);
      expect(user.mobile).toEqual(recordDto.mobile);
      expect(user.profile).toEqual(recordDto.profile);
    });
  });

  it('should list Users', async () => {
    const users = await service.getAllRecords();
    expect(users.length).toBe(7); // because some records were already in DB
  });

  it('should delete a Record with its ID', async () => {
    const res = await service.deleteRecordById(idForRecordDeletion);
    expect(res).not.toBe(null);
  });

  it('should update a record with its ID', async () => {
    const user = await service.updateRecordById(
      idForRecordUpdate,
      updateRecordDto,
    );

    const updatedUser = await service.findRecordById(idForRecordUpdate);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser.name).toEqual(updateRecordDto.name);
    expect(updatedUser.gender).toEqual(updateRecordDto.gender);
    expect(updatedUser.email).toEqual(updateRecordDto.email);
    expect(updatedUser.mobile).toEqual(updateRecordDto.mobile);
    expect(updatedUser.profile).toEqual(updateRecordDto.profile);
    expect(updatedUser.technologies).toEqual(updateRecordDto.technologies);
  });
});
