export const decodeState = (state: number) => {
  let closed: boolean = false;
  let tripped: boolean = false;
  let drawnOut: boolean = false;
  if (Boolean(state & 1)) {
    closed = true
  }
  if (Boolean(state & 2)) {
    tripped = true
  }
  if (Boolean(state & 4)) {
    drawnOut = true
  }
  return {
    closed,
    tripped,
    drawnOut
  }
}