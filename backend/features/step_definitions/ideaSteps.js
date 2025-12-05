const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const request = require("supertest");
const app = require("../../index");

let res;
let payload;

Given("I have a valid idea payload", function () {
  payload = {
    user_id: 1,
    titre: "New Idea",
    description: "Testing supertest",
  };
});

When("I send a POST request to {string}", async function (endpoint) {
  res = await request(app).post(endpoint).send(payload);
});

Then("the response status should be {int}", function (status) {
  assert.strictEqual(res.status, status);
});

Then("the response should contain the new idea id", function () {
  assert.ok(res.body.id);
});
