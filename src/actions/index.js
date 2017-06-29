export const RECEIVE_NEW_IMAGE = 'RECEIVE_NEW_IMAGE';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';

export const receiveNewImage = image => ({
  type: RECEIVE_NEW_IMAGE,
  image,
  meta: {
    router: {
      url: '/create',
    },
  },
});

export const clearImage = () => ({
  type: CLEAR_IMAGE,
  meta: {
    router: {
      url: '/',
    },
  },
});
