export const RECEIVE_NEW_IMAGE = 'RECEIVE_NEW_IMAGE';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';

export const receiveNewImage = image => ({
  type: RECEIVE_NEW_IMAGE,
  image,
});

export const clearImage = () => ({
  type: CLEAR_IMAGE,
});
