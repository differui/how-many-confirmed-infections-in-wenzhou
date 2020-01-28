export function clamp(num: number, min: number, max: number) {
  if (num < min) return min;
  if (num > max) return max;
  return num;
}

export function wait(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds));
}
