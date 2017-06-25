// Figure out our backing scale.
// This ensures canvas looks crisp on retina displays, where there are
// in fact 4 on-screen pixels for every 1 calculated pixel.
export function scaleCanvas(canvas, ctx) {
  const ratio = getPixelRatio(ctx);

  if (ratio === 1) {
    return;
  }

  /* eslint-disable no-param-reassign */
  canvas.style.height = canvas.height + 'px';
  canvas.style.width = canvas.width + 'px';
  canvas.width *= ratio;
  canvas.height *= ratio;
  /* eslint-enable */

  ctx.scale(ratio, ratio);
}

export function getPixelRatio(ctx) {
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio ||
                            1;

  return (window.devicePixelRatio || 1) / backingStoreRatio;
}
