import {
  Before,
  Given,
  Then,
  When,
  setWorldConstructor,
} from '@cucumber/cucumber';
import { expect } from 'chai';
import * as request from 'supertest';
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

When('I DELETE {string}', async function (this) {
  const deleteUrl = `/rooms/${this.id}`;
  this.res = await request(this.app.getHttpServer()).delete(deleteUrl);
});

When('I PUT {string} with', async function (this, url: string, body: string) {
  this.res = await request(this.app.getHttpServer())
    .put(url)
    .send(JSON.parse(body));
});

Then('response body is', async function (this, body: string) {
  expect(this.res.body).to.eql(JSON.parse(body));
});

Then('response status is {string}', async function (this, code: string) {
  expect(this.res.status).to.equal(parseInt(code));
});
