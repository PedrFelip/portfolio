import { describe, expect, it } from "bun:test";
import { acquireScrollLock } from "./scroll-lock";

describe("acquireScrollLock", () => {
  it("restores the original inline overflow when the overlay closes", () => {
    const style = { overflow: "auto" };
    const release = acquireScrollLock(style);
    expect(style.overflow).toBe("hidden");
    release();
    expect(style.overflow).toBe("auto");
  });

  it.each([false, true])(
    "keeps scrolling locked until both overlays close (reverse: %s)",
    (reverse) => {
      const style = { overflow: "" };
      const releases = [acquireScrollLock(style), acquireScrollLock(style)];
      if (reverse) releases.reverse();
      releases[0]();
      expect(style.overflow).toBe("hidden");
      releases[1]();
      expect(style.overflow).toBe("");
    },
  );

  it("does not release another overlay when cleanup runs twice", () => {
    const style = { overflow: "scroll" };
    const releaseFirst = acquireScrollLock(style);
    const releaseSecond = acquireScrollLock(style);
    releaseFirst();
    releaseFirst();
    expect(style.overflow).toBe("hidden");
    releaseSecond();
    expect(style.overflow).toBe("scroll");
  });

  it("captures the current overflow each time a new lock cycle starts", () => {
    const style = { overflow: "" };
    acquireScrollLock(style)();
    style.overflow = "auto";
    acquireScrollLock(style)();
    expect(style.overflow).toBe("auto");
  });

  it("keeps independent style targets isolated", () => {
    const first = { overflow: "auto" };
    const second = { overflow: "scroll" };
    const releaseFirst = acquireScrollLock(first);
    const releaseSecond = acquireScrollLock(second);
    releaseFirst();
    expect(first.overflow).toBe("auto");
    expect(second.overflow).toBe("hidden");
    releaseSecond();
    expect(second.overflow).toBe("scroll");
  });
});
