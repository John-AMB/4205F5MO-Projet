const request = require("supertest");
const app = require("../../index");

jest.mock("../../models/ideaModel", () => ({
  createIdea: jest.fn().mockResolvedValue({ id: 1 }),
}));

describe("Integration — Create Idea", () => {
  test("Creates an idea successfully", async () => {
    const res = await request(app).post("/ideas").send({
      user_id: "123",
      titre: "Test Idea",
      description: "Something here",
    });

    expect(res.statusCode).toBe(201);
  });
});
