import { describe, expect, it } from "vitest";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_MB } from "./index.js";

describe("shared limits", () => {
  it("keeps the native upload limit at exactly 100 MiB", () => {
    expect(MAX_UPLOAD_MB).toBe(100);
    expect(MAX_UPLOAD_BYTES).toBe(104_857_600);
  });
});
