import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import app from "../../index.js";

let res;
let payload;
let createdUserId;

Given("I have a valid user payload", function () {
  payload = {
    username: `testuser_${Date.now()}`, // unique username each test run
    email: `test_${Date.now()}@example.com`,
    password: "123456",
  };
});

When('I send a POST request to "/users"', async function () {
  res = await request(app).post("/users").send(payload);
  if (res.body.id) {
    createdUserId = res.body.id; // store the new user ID
  }
});

Then("the response status for user should be {int}", function (status) {
  assert.strictEqual(res.status, status);
});

Then("the response should contain the new user id", function () {
  assert.ok(createdUserId, "No user ID returned in response");
});

When('I send a GET request to "/users/{userId}"', async function () {
  if (!createdUserId) throw new Error("No user created to retrieve");
  res = await request(app).get(`/users/${createdUserId}`);
});

Then("the response should contain the user data", function () {
  assert.strictEqual(res.body.username, payload.username);
  assert.strictEqual(res.body.email, payload.email);
});
