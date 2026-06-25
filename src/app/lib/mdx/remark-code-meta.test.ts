import { describe, expect, it } from "bun:test";
import { parseCodeMeta } from "./remark-code-meta";

describe("parseCodeMeta", () => {
  it("extracts title from title= attribute", () => {
    expect(parseCodeMeta("ts", 'title="user.ts"')).toEqual({
      title: "user.ts",
      language: "ts",
    });
  });

  it("accepts file= as alias for title", () => {
    expect(parseCodeMeta("go", 'file="main.go"')).toEqual({
      title: "main.go",
      language: "go",
    });
  });

  it("accepts name= as alias for title", () => {
    expect(parseCodeMeta("go", 'name="server.go"')).toEqual({
      title: "server.go",
      language: "go",
    });
  });

  it("returns null title when no title= attribute is present", () => {
    expect(parseCodeMeta("ts", "")).toEqual({
      title: null,
      language: "ts",
    });
    expect(parseCodeMeta("ts", undefined)).toEqual({
      title: null,
      language: "ts",
    });
  });

  it("returns null title when meta has only other attributes", () => {
    expect(parseCodeMeta("ts", "{1,3-5}")).toEqual({
      title: null,
      language: "ts",
    });
  });

  it("extracts title from meta combined with other tokens", () => {
    expect(parseCodeMeta("ts", '{1,3-5} title="x.ts"')).toEqual({
      title: "x.ts",
      language: "ts",
    });
    expect(parseCodeMeta("ts", 'title="x.ts" {1,3-5}')).toEqual({
      title: "x.ts",
      language: "ts",
    });
  });

  it("supports paths in the filename", () => {
    expect(parseCodeMeta("ts", 'title="src/services/user.service.ts"')).toEqual(
      {
        title: "src/services/user.service.ts",
        language: "ts",
      },
    );
  });

  it("returns null language when lang is missing", () => {
    expect(parseCodeMeta(null, 'title="x"')).toEqual({
      title: "x",
      language: null,
    });
    expect(parseCodeMeta(undefined, 'title="x"')).toEqual({
      title: "x",
      language: null,
    });
  });

  it("matches the first title= when multiple are present", () => {
    expect(parseCodeMeta("ts", 'title="first.ts" title="second.ts"')).toEqual({
      title: "first.ts",
      language: "ts",
    });
  });

  it("handles meta with leading whitespace and extra spaces", () => {
    expect(parseCodeMeta("ts", '  title="x.ts"  ')).toEqual({
      title: "x.ts",
      language: "ts",
    });
  });

  it("ignores title= that is part of a longer word", () => {
    expect(parseCodeMeta("ts", 'my-title="x.ts"')).toEqual({
      title: null,
      language: "ts",
    });
  });
});
