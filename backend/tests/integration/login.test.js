const request = require("supertest");
const app = require("../../index");

jest.mock("../../models/userModel", () => ({
  findByUsernameAndPassword: jest.fn().mockResolvedValue(null),
}));

describe("Integration — Login", () => {
  test("returns 401 with wrong password", async () => {
    const res = await request(app).post("/users/login").send({
      username: "testuser",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
  });
});
