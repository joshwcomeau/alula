export default function createCanvasHistory() {
  const states = [];

  let currentStateIndex = 0;

  const placeholderImage = new Image();

  return {
    save(canvas) {
      //create a new canvas
      const newCanvas = document.createElement('canvas');
      const context = newCanvas.getContext('2d');

      //set dimensions
      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height;

      //apply the old canvas to the new one
      context.drawImage(canvas, 0, 0);

      states.push(newCanvas);
      currentStateIndex = states.length - 1;
      console.log('Saving', currentStateIndex);
    },

    restore(ctx) {
      console.log('Restoring', ctx)
      ctx.drawImage(states[currentStateIndex], 0, 0);
    },
  };

}
