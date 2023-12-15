import { When, Then, Given } from '@cucumber/cucumber';
import * as request from 'supertest';
import { expect } from 'chai';
import { Before, setWorldConstructor } from '@cucumber/cucumber';
import { CustomWorld } from '../world';

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.initNestApp();
});

Given('I have a room named {string}', async function (this, name: string) {
  this.res = await request(this.app.getHttpServer())
    .post('/rooms')
    .send({
      name,
      description: name + 'description',
    });
  this.id = this.res.body.id;
});

When('I POST {string} with', async function (this, url: string, body: string) {
  this.res = await request(this.app.getHttpServer())
    .post(url)
    .send(JSON.parse(body));
});

When('I GET {string}', async function (this, url: string) {
  this.res = await request(this.app.getHttpServer()).get(url);
});

Then('response status is {string}', async function (this, code: string) {
  expect(this.res.status).to.equal(parseInt(code));
});
