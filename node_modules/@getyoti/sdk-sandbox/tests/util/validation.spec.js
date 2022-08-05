const { YotiDate } = require('yoti');

const {
  Validation,
} = require('../../src/util');

describe('Validation', () => {
  describe('#isYotiDate', () => {
    it('should allow valid YotiDate', () => {
      const yotiDate = YotiDate.fromDateString('2020-01-01');
      expect(() => Validation.isYotiDate(yotiDate, 'name'))
        .not.toThrowError();
    });

    test.each([
      ['some-string'],
      [123],
      [new Date()],
      [null],
    ])('should throw type error when invalid YotiDate is provided', (value) => {
      expect(() => Validation.isYotiDate(value, 'name'))
        .toThrowError(new TypeError('name must be instance of YotiDate'));
    });
  });
});
