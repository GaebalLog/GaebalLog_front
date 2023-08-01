/* eslint-disable no-undef */
import { server } from "@/tests/msw/server";
import "@testing-library/jest-dom/extend-expect";

beforeAll(() => server.listen());

afterEach(() => {
  jest.clearAllMocks();
  server.resetHandlers();
});

afterAll(() => server.close());
