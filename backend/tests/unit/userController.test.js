// tests/unit/userController.test.js
const {
  getUsers,
  getUser,
  createUser,
  loginUser,
  changePassword,
  changeBio,
  changeProfilePhoto,
  deleteAccount,
} = require("../../controllers/userController");

const User = require("../../models/userModel");
const cloudinary = require("../../cloudinaryConfig");
const streamifier = require("streamifier");

// ----------------------
// Mocks
// ----------------------
jest.mock("../../models/userModel");
jest.mock("streamifier");

// Mock cloudinary uploader
cloudinary.uploader = {
  upload_stream: jest.fn(),
};

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  // ---------------------------------------------------
  // getUsers
  // ---------------------------------------------------
  test("getUsers → returns all users", async () => {
    const mockUsers = [{ id: 1 }, { id: 2 }];
    User.getAllUsers.mockResolvedValue(mockUsers);

    await getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  test("getUsers → handles errors", async () => {
    User.getAllUsers.mockRejectedValue(new Error("DB error"));

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  // ---------------------------------------------------
  // getUser
  // ---------------------------------------------------
  test("getUser → returns one user", async () => {
    req.params.id = 1;
    const mockUser = { id: 1 };
    User.getUserById.mockResolvedValue(mockUser);

    await getUser(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test("getUser → 404 when not found", async () => {
    req.params.id = 99;
    User.getUserById.mockResolvedValue(null);

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // ---------------------------------------------------
  // createUser
  // ---------------------------------------------------
  test("createUser → creates a user", async () => {
    req.body = { username: "test", password: "123", bio: "hello" };

    const mockUser = { id: 10 };
    User.createUser.mockResolvedValue(mockUser);

    await createUser(req, res);

    expect(User.createUser).toHaveBeenCalledWith({
      username: "test",
      password: "123",
      bio: "hello",
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("createUser → missing fields", async () => {
    req.body = { username: "" };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  // ---------------------------------------------------
  // loginUser
  // ---------------------------------------------------
  test("loginUser → success", async () => {
    req.body = { username: "john", password: "pass" };
    const mockUser = { id: 1 };
    User.findByUsernameAndPassword.mockResolvedValue(mockUser);

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Connexion réussie",
      user: mockUser,
    });
  });

  test("loginUser → bad credentials", async () => {
    req.body = { username: "john", password: "pass" };
    User.findByUsernameAndPassword.mockResolvedValue(null);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  // ---------------------------------------------------
  // changePassword
  // ---------------------------------------------------
  test("changePassword → success", async () => {
    req.body = { userId: 1, oldPassword: "old", newPassword: "new" };

    User.verifyOldPassword.mockResolvedValue(true);

    await changePassword(req, res);

    expect(User.updatePassword).toHaveBeenCalledWith(1, "new");
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Mot de passe mis à jour avec succès",
    });
  });

  test("changePassword → wrong old password", async () => {
    req.body = { userId: 1, oldPassword: "wrong", newPassword: "new" };

    User.verifyOldPassword.mockResolvedValue(null);

    await changePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  // ---------------------------------------------------
  // changeBio
  // ---------------------------------------------------
  test("changeBio → updates bio", async () => {
    req.body = { userId: 1, bio: "New bio" };

    const mockUser = { id: 1, bio: "New bio" };
    User.updateBio.mockResolvedValue(mockUser);

    await changeBio(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: mockUser,
      message: "Bio mise à jour avec succès",
    });
  });

  test("changeBio → missing fields", async () => {
    req.body = { userId: 1 };

    await changeBio(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  // ---------------------------------------------------
  // changeProfilePhoto
  // ---------------------------------------------------
  test("changeProfilePhoto → uploads + updates user", async () => {
    req.body = { userId: 1 };
    req.file = { buffer: Buffer.from("mock") };

    // Mock Cloudinary success
    cloudinary.uploader.upload_stream.mockImplementation((cb) =>
      cb(null, { secure_url: "https://mock/photo.jpg" })
    );

    streamifier.createReadStream.mockReturnValue({
      pipe: jest.fn(),
    });

    const mockUser = { id: 1, photo: "url" };
    User.updateProfilePhoto.mockResolvedValue(mockUser);

    await changeProfilePhoto(req, res);

    expect(User.updateProfilePhoto).toHaveBeenCalledWith(
      1,
      "https://mock/photo.jpg"
    );
    expect(res.json).toHaveBeenCalled();
  });

  test("changeProfilePhoto → no file", async () => {
    req.body = { userId: 1 };

    await changeProfilePhoto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("changeProfilePhoto → cloudinary error", async () => {
    req.body = { userId: 1 };
    req.file = { buffer: Buffer.from("mock") };

    cloudinary.uploader.upload_stream.mockImplementation((cb) =>
      cb(new Error("Upload failed"))
    );

    streamifier.createReadStream.mockReturnValue({
      pipe: jest.fn(),
    });

    await changeProfilePhoto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // ---------------------------------------------------
  // deleteAccount
  // ---------------------------------------------------
  test("deleteAccount → deletes user", async () => {
    req.body = {
      userId: 1,
      username: "john",
      confirmUsername: "john",
    };

    User.getUserById.mockResolvedValue({ id: 1, username: "john" });

    await deleteAccount(req, res);

    expect(User.deleteUser).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Compte supprimé avec succès",
    });
  });

  test("deleteAccount → username mismatch", async () => {
    req.body = {
      userId: 1,
      username: "a",
      confirmUsername: "b",
    };

    await deleteAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("deleteAccount → wrong username for user", async () => {
    req.body = {
      userId: 1,
      username: "wrong",
      confirmUsername: "wrong",
    };

    User.getUserById.mockResolvedValue({ username: "correct" });

    await deleteAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});
