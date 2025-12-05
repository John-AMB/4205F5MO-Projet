const { Given, When, Then } = require("@cucumber/cucumber");
const request = require("supertest");
const assert = require("assert");
const app = require("../../index");

let payload;
let res;
let createdUserId;

Given("I have a valid user payload", function () {
  const uniqueId = Math.floor(Math.random() * 100000); //5 number
  payload = {
    username: `testuser${uniqueId}`,
    password: "testpass",
    bio: "Hello, I am a test user",
  };
});

When(
  "I create a new user with a POST request to {string}",
  async function (path) {
    res = await request(app).post(path).send(payload);
    console.log("POST /users response:", res.status, res.body); //les resultats
    if (res.body.user) createdUserId = res.body.user.id;
  }
);

Then(
  "the response status for creating user should be {int}",
  function (status) {
    assert.strictEqual(res.status, status);
  }
);

Then("the response should contain the new user id", function () {
  assert.ok(res.body.user.id);
});

Given("I have a created user", async function () {
  if (!createdUserId)
    throw new Error("No user created yet. Run the create user scenario first.");
});

When("I send a GET request to {string}", async function (path) {
  if (!createdUserId) throw new Error("No user created yet, cannot GET user.");
  path = path.replace("{id}", createdUserId);
  res = await request(app).get(path);
  console.log("GET /users/:id response:", res.status, res.body);
});

Then("the response should contain the user data", function () {
  assert.strictEqual(res.body.username, payload.username);
  assert.strictEqual(res.body.bio, payload.bio);
});
