// Deliberate horizontal gestures only; taps, scrolling and long presses do not turn pages.
export function swipeStep(deltaX: number, deltaY: number, duration: number): -1 | 0 | 1 {
  if (duration > 800 || Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return 0;
  return deltaX < 0 ? 1 : -1;
}
