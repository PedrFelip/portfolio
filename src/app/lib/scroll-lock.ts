type OverflowStyle = Pick<CSSStyleDeclaration, "overflow">;

interface ScrollLock {
  count: number;
  previousOverflow: string;
}

const locks = new WeakMap<OverflowStyle, ScrollLock>();

/** Each overlay releases only its own lock, regardless of closing order. */
export function acquireScrollLock(style: OverflowStyle): () => void {
  let lock = locks.get(style);
  if (!lock) {
    lock = { count: 0, previousOverflow: style.overflow };
    locks.set(style, lock);
    style.overflow = "hidden";
  }
  lock.count += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    lock.count -= 1;

    if (lock.count === 0) {
      style.overflow = lock.previousOverflow;
      locks.delete(style);
    }
  };
}
