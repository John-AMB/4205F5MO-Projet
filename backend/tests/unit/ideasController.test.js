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
// Mocks
// -------------------------
jest.mock("../../models/ideaModel");

// Mock Cloudinary uploader
cloudinary.uploader = {
  upload_stream: jest.fn().mockImplementation((callback) => {
    // Simulate successful upload immediately
    callback(null, { secure_url: "https://mock.cloudinary/test.jpg" });
    return { end: jest.fn() }; // required by your controller
  }),
};

// Mock streamifier to just return a dummy pipe object
streamifier.createReadStream.mockImplementation(() => ({
  pipe: jest.fn(),
}));

// -------------------------
// Tests
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
    const mockData = [{ id: 1, titre: "Hello" }];
    IdeasModel.getAllIdeas.mockResolvedValue(mockData);

    await getAllIdeas(req, res);

    expect(IdeasModel.getAllIdeas).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  // ------------------------------
  // GET IDEA BY ID
  // ------------------------------
  test("getIdeaById → returns idea if found", async () => {
    req.params.id = 1;
    const mockIdea = { id: 1, titre: "Test" };

    IdeasModel.getIdeaById.mockResolvedValue(mockIdea);

    await getIdeaById(req, res);

    expect(IdeasModel.getIdeaById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockIdea);
  });

  test("getIdeaById → 404 when not found", async () => {
    req.params.id = 999;
    IdeasModel.getIdeaById.mockResolvedValue(null);

    await getIdeaById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Idea not found" });
  });

  // -------------------------------
  // CREATE IDEA
  // -------------------------------
  test("createIdea → uploads image + creates idea", async () => {
    req.file = { buffer: Buffer.from("mock") };
    req.body = {
      user_id: "abc",
      titre: "Test",
      description: "Desc",
    };

    IdeasModel.createIdea.mockResolvedValue({ id: 10 });

    await createIdea(req, res);

    expect(IdeasModel.createIdea).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "abc",
        titre: "Test",
        description: "Desc",
        photo: expect.any(String),
      })
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Idea created",
      id: 10,
    });
  });

  test("createIdea → no file still works", async () => {
    req.body = {
      user_id: "abc",
      titre: "Test",
      description: "Desc",
    };

    IdeasModel.createIdea.mockResolvedValue({ id: 5 });

    await createIdea(req, res);

    expect(IdeasModel.createIdea).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  // -------------------------------
  // UPDATE IDEA
  // -------------------------------
  test("updateIdea → updates idea", async () => {
    req.params.id = 1;
    req.body = { titre: "Updated" };

    IdeasModel.updateIdea.mockResolvedValue({ id: 1, titre: "Updated" });

    await updateIdea(req, res);

    expect(IdeasModel.updateIdea).toHaveBeenCalledWith(1, {
      titre: "Updated",
    });

    expect(res.json).toHaveBeenCalledWith({
      message: "Idea updated",
      idea: { id: 1, titre: "Updated" },
    });
  });

  // -------------------------------
  // DELETE IDEA
  // -------------------------------
  test("deleteIdea → deletes idea", async () => {
    req.params.id = 1;

    await deleteIdea(req, res);

    expect(IdeasModel.deleteIdea).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ message: "Idea deleted" });
  });
  // ------------------------------
  // getAllIdeas error
  //-------------------------------
  test("getAllIdeas → handles error", async () => {
    const errorMessage = "DB error";
    IdeasModel.getAllIdeas.mockRejectedValue(new Error(errorMessage));

    await getAllIdeas(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  // ------------------------------
  // getIdeaById error
  //-------------------------------
  test("getIdeaById → handles error", async () => {
    const errorMessage = "DB error";
    req.params.id = 1;
    IdeasModel.getIdeaById.mockRejectedValue(new Error(errorMessage));

    await getIdeaById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
  const cloudinary = require("../../cloudinaryConfig");
  const streamifier = require("streamifier");

  // ------------------------------
  // cloudinary error
  //-------------------------------
  test("createIdea → fails if Cloudinary upload fails", async () => {
    req.file = { buffer: Buffer.from("mock") };
    req.body = { user_id: "abc", titre: "Fail", description: "Fail" };

    // Simulate Cloudinary failure
    cloudinary.uploader.upload_stream.mockImplementation((cb) =>
      cb(new Error("Upload failed"))
    );

    await createIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Upload failed" });
  });
  // ------------------------------
  // update error
  //-------------------------------
  test("updateIdea → handles error", async () => {
    req.params.id = 1;
    req.body = { titre: "Test" };
    IdeasModel.updateIdea.mockRejectedValue(new Error("Update error"));

    await updateIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Update error" });
  });

  // ------------------------------
  // delete error
  //-------------------------------
  test("deleteIdea → handles error", async () => {
    req.params.id = 1;
    IdeasModel.deleteIdea.mockRejectedValue(new Error("Delete error"));

    await deleteIdea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Delete error" });
  });
});
