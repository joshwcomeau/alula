import {rotatePointCW, rotatePointCCW} from './geometry.utils';

describe('geometry utils', () => {
  describe('rotatePointCW', () => {
    it('rotates a top-edge point', () => {
      const size = 5;
      const point = {x: 3, y: 0};

      const actualResult = rotatePointCW(point, size);
      const expectedResult = {x: 5, y: 3};

      expect(actualResult).toEqual(expectedResult);
    });

    it('rotates a left-edge point', () => {
      const size = 5;
      const point = {x: 0, y: 1};

      const actualResult = rotatePointCW(point, size);
      const expectedResult = {x: 4, y: 0};

      expect(actualResult).toEqual(expectedResult);
    });

    it('rotates a right-edge point', () => {
      const size = 5;
      const point = {x: size, y: 4};


      const actualResult = rotatePointCW(point, size);
      const expectedResult = {x: 1, y: size};

      expect(actualResult).toEqual(expectedResult);
    });

    it('rotates a bottom-edge point', () => {
      const size = 5;
      const point = {x: 2, y: size};

      const actualResult = rotatePointCW(point, size);
      const expectedResult = {x: 0, y: 2};

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('rotatePointCCW', () => {
    it('rotates a top-edge point', () => {
      const size = 5;
      const point = {x: 3, y: 0};

      const actualResult = rotatePointCCW(point, size);
      const expectedResult = {x: 0, y: 2};

      expect(actualResult).toEqual(expectedResult);
    });

    it('rotates a left-edge point', () => {
      const size = 5;
      const point = {x: 0, y: 1};

      const actualResult = rotatePointCCW(point, size);
      const expectedResult = {x: 1, y: size};

      expect(actualResult).toEqual(expectedResult);
    });

    it('rotates a right-edge point', () => {
      const size = 5;
      const point = {x: size, y: 4};


      const actualResult = rotatePointCCW(point, size);
      const expectedResult = {x: 4, y: 0};

      expect(actualResult).toEqual(expectedResult);
    });

    it('rotates a bottom-edge point', () => {
      const size = 5;
      const point = {x: 1, y: size};

      const actualResult = rotatePointCCW(point, size);
      const expectedResult = {x: 5, y: 4};

      expect(actualResult).toEqual(expectedResult);
    });
  });
})
