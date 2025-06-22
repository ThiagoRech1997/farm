import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/pesagens/com-nomes (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/pesagens/com-nomes')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      const pesagem = response.body[0];
      expect(pesagem).toHaveProperty('ID');
      expect(pesagem).toHaveProperty('Animal_ID');
      expect(pesagem).toHaveProperty('Data_Pesagem');
      expect(pesagem).toHaveProperty('Peso');
      expect(pesagem).toHaveProperty('Animal_Nome');
    }
  });

  it('/reprodutores (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/reprodutores')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      const reprodutor = response.body[0];
      expect(reprodutor).toHaveProperty('ID');
      expect(reprodutor).toHaveProperty('Nome');
    }
  });
});
