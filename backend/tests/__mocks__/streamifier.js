module.exports = {
  createReadStream: jest.fn(() => ({
    pipe: jest.fn(),
  })),
};
