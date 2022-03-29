import 'reflect-metadata';
import * as bcrypt from 'bcrypt';

import {
  Controller,
  INestApplication,
  Injectable,
  Module,
  Post,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { HashModule, HashService } from 'nestjs-hash';

const MESSAGE = 'Hello World!';

@Injectable()
class TestService {
  constructor(private readonly hashService: HashService) {}

  public async makeHash() {
    return {
      hash: this.hashService.hashSync(MESSAGE),
    };
  }
}

@Controller()
class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  public async testFunction() {
    return this.testService.makeHash();
  }
}

@Module({
  imports: [
    HashModule.forRoot({
      type: 'bcrypt',
      rounds: 2,
    }),
  ],
  controllers: [TestController],
  providers: [TestService],
})
class TestModule {}

describe('Using lib nestjs-hash with md5 algorithm', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able create and return hash with algorithm bcrypt', async () => {
    const response = await request(app.getHttpServer()).post('/');

    expect(response.status).toBe(201);
    expect(bcrypt.compareSync(MESSAGE, response.body.hash)).toEqual(true);
  });
});
