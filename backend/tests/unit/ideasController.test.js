// tests/unit/ideasController.test.js

const {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
} = require("../../controllers/ideaController");

const IdeasModel = require("../../models/ideaModel");
const cloudinary = require("../../cloudinaryConfig");
const streamifier = require("streamifier");

// -------------------------
// GLOBAL MOCKS
// -------------------------
jest.mock("../../models/ideaModel");

// Fake Cloudinary uploader — always returns a mock URL unless replaced in a test
cloudinary.uploader = {
  upload_stream: jest.fn().mockImplementation((cb) => {
    cb(null, { secure_url: "https://mock.cloudinary/test.jpg" });
    return { end: jest.fn() };
  }),
};

// mock streamifier pipe
streamifier.createReadStream = jest.fn(() => ({
  pipe: jest.fn(),
}));

// -------------------------
describe("Ideas Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    jest.clearAllMocks();
  });

  // -------------------------------
  // GET ALL IDEAS
  // -------------------------------
  test("getAllIdeas → returns list", async () => {
    const mockData = [{ id: 1 }];
    IdeasModel.getAllIdeas.mockResolvedValue(mockData);

    await getAllIdeas(req, res);

    expect(IdeasModel.getAllIdeas).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test("getAllIdeas → handles error", async () => {
    IdeasModel.getAllIdeas.mockRejectedValue(new Error("DB error"));

    await getAllIdeas(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  // -------------------------------
  // GET IDEA BY ID
  // -------------------------------
  test("getIdeaById → returns idea", async () => {
    req.params.id = 1;
    const mockIdea = { id: 1 };
    IdeasModel.getIdeaById.mockResolvedValue(mockIdea);

    await getIdeaById(req, res);

    expect(IdeasModel.getIdeaById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockIdea);
  });

  test("getIdeaById → 404 not found", async () => {
    req.params.id = 999;
    IdeasModel.getIdeaById.mockResolvedValue(null);

    await getIdeaById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Idea not found" });
  });

  test("getIdeaById → handles error", async () => {
    req.params.id = 1;
    IdeasModel.getIdeaById.mockRejectedValue(new Error("DB error"));

    await getIdeaById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("createIdea → creates idea without file", async () => {
    req.body = {
      user_id: "u1",
      titre: "test",
      description: "desc",
    };

    IdeasModel.createIdea.mockResolvedValue({ id: 1 });

    await createIdea(req, res);

    expect(IdeasModel.createIdea).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Idea created",
      id: 1,
    });
  });

  test("createIdea → creates idea with image", async () => {
    req.body = {
      user_id: "abc",
      titre: "T",
      description: "D",
    };
    req.file = { buffer: Buffer.from("mock") };

    IdeasModel.createIdea.mockResolvedValue({ id: 10 });

    await createIdea(req, res);

    expect(IdeasModel.createIdea).toHaveBeenCalledWith(
      expect.objectContaining({
        photo: expect.any(String),
      })
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("createIdea → handles Cloudinary error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    req.body = {
      user_id: "abc",
      titre: "X",
      description: "Y",
    };
    req.file = { buffer: Buffer.from("mock") };

    cloudinary.uploader.upload_stream.mockImplementationOnce((cb) => {
      cb(new Error("Upload failed"));
      return { end: jest.fn() };
    });

    await createIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Upload failed" });
    // Restore console.error
    consoleSpy.mockRestore();
  });

  // -------------------------------
  // UPDATE IDEA
  // -------------------------------
  test("updateIdea → updates idea", async () => {
    req.params.id = 5;
    req.body = { titre: "New" };

    IdeasModel.updateIdea.mockResolvedValue({ id: 5, titre: "New" });

    await updateIdea(req, res);

    expect(IdeasModel.updateIdea).toHaveBeenCalledWith(5, { titre: "New" });
    expect(res.json).toHaveBeenCalledWith({
      message: "Idea updated",
      idea: { id: 5, titre: "New" },
    });
  });

  test("updateIdea → handles error", async () => {
    req.params.id = 1;
    req.body = {};
    IdeasModel.updateIdea.mockRejectedValue(new Error("Update error"));

    await updateIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Update error" });
  });

  // -------------------------------
  // DELETE IDEA
  // -------------------------------
  test("deleteIdea → deletes idea", async () => {
    req.params.id = 7;

    await deleteIdea(req, res);

    expect(IdeasModel.deleteIdea).toHaveBeenCalledWith(7);
    expect(res.json).toHaveBeenCalledWith({ message: "Idea deleted" });
  });

  test("deleteIdea → handles error", async () => {
    req.params.id = 1;
    IdeasModel.deleteIdea.mockRejectedValue(new Error("Delete error"));

    await deleteIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Delete error" });
  });
});
