const getEdgeForPoint = ({ x, y }, size) => {
  // our edge notation is simple: 'left', 'top', 'bottom', 'right'.
  if (x === 0) {
    return 'left';
  }

  if (y === 0) {
    return 'top'
  }

  if (x === size) {
    return 'right'
  }

  if (y === size) {
    return 'bottom';
  }
}

export const rotatePointCW = (point, size) => {
  const edge = getEdgeForPoint(point, size);

  // Hardcode the effects of rotation on the point.
  // For example, say we're given point {x: 2, y: 0}, and a total size of 5.
  //
  // (2,0)
  //  _.___
  // |     |
  // |_____|
  // 0     5
  //
  // We know that this is on the top edge, and that when rotated 90 degrees
  // clockwise, this point becomes {x: 5, y: 2}:
  //
  //  _____
  // |     + (5, 2)
  // |_____|
  // 0     5
  //
  // The transformation is that X transforms to 5, and Y transforms to X.
  // The table below stores the rotations for each of the 4 edges:
  const rotationMultipliers = {
    top: ({x, y}) => ({x: size, y: x}),
    left: ({x, y}) => ({x: size - y, y: 0}),
    right: ({x, y}) => ({x: size - y, y: size}),
    bottom: ({x, y}) => ({x: 0, y: x}),
  }

  return rotationMultipliers[edge](point);
}

export const rotatePointCCW = (point, size) => {
  const edge = getEdgeForPoint(point, size);

  const rotationMultipliers = {
    top: ({x, y}) => ({x: 0, y: size - x}),
    left: ({x, y}) => ({x: y, y: size}),
    right: ({x, y}) => ({x: y, y: size - x}),
    bottom: ({x, y}) => ({x: size, y: size - x}),
  }

  return rotationMultipliers[edge](point);
}

const rotatePoint = direction => (point, size) => {
  const edge = getEdgeForPoint(point);

  // Our default direction is 'cw', but we can also specify 'ccw'.
  // The logic is reversed for going 'ccw'
  const rotationMultipliers = {
    top: ({x, y}) => [size, x],
    right: ({x, y}) => []
  }

  switch (edge) {
    case 'left':
  }
}

const rotateLine = direction => line => {
  // We know a few things about our line:
  // - it will have two points
  // - each point will be on an edge, and a different edge.
  const p1Edge = getEdgeForPoint(line.p1);
  const p2Edge = getEdgeForPoint(line.p2);

  //
}


export function calculatePerimeter(args) {

}
