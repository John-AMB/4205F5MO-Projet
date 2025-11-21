jest.mock("cloudinary", () => ({
  uploader: {
    upload_stream: jest.fn().mockReturnValue({
      end: jest.fn(),
    }),
  },
}));
