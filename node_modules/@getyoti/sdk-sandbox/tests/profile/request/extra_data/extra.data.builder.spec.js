const { YotiDate } = require('yoti');
const {
  SandboxExtraDataBuilder,
  SandboxAttributeIssuanceDetailsBuilder,
} = require('../../../..');
const SandboxExtraData = require('../../../../src/profile/request/extra_data/extra.data');

describe('SandboxExtraDataBuilder', () => {
  it('should build SandboxExtraData', () => {
    const sandboxExtraData = new SandboxExtraDataBuilder().build();

    expect(sandboxExtraData).toBeInstanceOf(SandboxExtraData);
  });

  it('should build SandboxExtraData with data entry', () => {
    const sandboxAttributeIssuanceDetails = new SandboxAttributeIssuanceDetailsBuilder()
      .withDefinition('some-definition')
      .withExpiryDate(YotiDate.fromDateString('2020-01-02T00:00:00Z'))
      .withIssuanceToken('some-token')
      .build();

    const sandboxExtraData = new SandboxExtraDataBuilder()
      .withDataEntry(sandboxAttributeIssuanceDetails)
      .build();

    expect(JSON.stringify(sandboxExtraData))
      .toEqual(JSON.stringify({
        data_entry: [sandboxAttributeIssuanceDetails],
      }));
  });
});
