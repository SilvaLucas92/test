/**
 * @jest-environment node
 */
import handler from "./index";
import { createMocks } from "node-mocks-http";
import Leads from "../../../models/Leads";
import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: any;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("/leads", () => {
  it("Should create a lead successfully", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "Lucas",
        lastname: "Silva",
        email: "lucas@test.com",
        description: "Test CTA",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
  });

  it("Should return a 405 when is not POST", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({
      error: "Only post allowed",
    });
  });

  it("should return a 400 error if lead creation fails", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "Lucas",
        lastname: "Silva",
        email: "lucas@gmail.com",
        description: "Test description.",
      },
    });

    const createError = new Error("Lead creation error");
    jest.spyOn(Leads, "create").mockRejectedValueOnce(createError);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});

