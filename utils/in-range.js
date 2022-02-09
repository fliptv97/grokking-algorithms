export function inRange(value, min, max) {
  if (!isNumber(value) || !isNumber(min) || !isNumber(max)) return;

  return value >= min && value <= max;
}
