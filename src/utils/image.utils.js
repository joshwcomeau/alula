export const readAsDataURL = file => (
  new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onload = ev => resolve(ev.target.result);

      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  })
);

export const loadImage = src => (
  new Promise((resolve, reject) => {
    try {
      const image = document.createElement('img');
      image.setAttribute('crossOrigin', 'anonymous');

      image.onload = ev => resolve(image);

      image.src = src;
    } catch (err) {
      reject(err);
    }
  })
);
