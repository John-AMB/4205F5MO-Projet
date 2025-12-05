import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import app from "../../index.js";

let res;
let payload;

Given("I have a valid idea payload", function () {
  payload = {
    user_id: 1,
    titre: "New Idea",
    description: "Testing supertest",
  };
});

When("I send a POST request to /ideas", async function () {
  res = await request(app).post("/ideas").send(payload);
});

Then("the response status should be {int}", function (status) {
  assert.strictEqual(res.status, status);
});

Then("the response should contain the new idea id", function () {
  assert.ok(res.body.id);
});
