const request = require("supertest");
const app = require("../../index");

jest.mock("../../models/userModel", () => ({
  verifyOldPassword: jest.fn().mockResolvedValue(null),
  updatePassword: jest.fn(),
}));

describe("Integration — Change Password", () => {
  test("Rejects invalid old password", async () => {
    const res = await request(app).post("/users/change-password").send({
      userId: 1,
      oldPassword: "badPass",
      newPassword: "newPass",
    });

    expect(res.statusCode).toBe(401);
  });
});
