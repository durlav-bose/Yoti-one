const { YotiDate } = require('yoti');
const IssuingAttributes = require('../../../../../src/profile/request/extra_data/third_party/issuing.attributes');
const Definition = require('../../../../../src/profile/request/extra_data/third_party/definition');

const SOME_DEFINITION = new Definition('some-name');

describe('SandboxIssuingAttributes', () => {
  test.each([
    ['2020-01-02T00:00:00.123456Z', '2020-01-02T00:00:00.123Z'],
    ['2020-01-02T00:00:00.123+04:00', '2020-01-01T20:00:00.123Z'],
    ['2020-01-02T00:00:00.123-04:00', '2020-01-02T04:00:00.123Z'],
  ])('should serialise to JSON with date %s', (inputDate, outputDate) => {
    const SOME_DATE = new Date(inputDate);
    const issuingAttributes = new IssuingAttributes(SOME_DATE, [SOME_DEFINITION]);

    expect(JSON.stringify(issuingAttributes))
      .toEqual(JSON.stringify({
        expiry_date: outputDate,
        definitions: [SOME_DEFINITION],
      }));
  });

  it('should serialise to JSON with YotiDate', () => {
    const SOME_DATE = YotiDate.fromDateString('2020-01-02T00:00:00.123456Z');
    const issuingAttributes = new IssuingAttributes(SOME_DATE, [SOME_DEFINITION]);

    expect(JSON.stringify(issuingAttributes))
      .toEqual(JSON.stringify({
        expiry_date: '2020-01-02T00:00:00.123Z',
        definitions: [SOME_DEFINITION],
      }));
  });
});
