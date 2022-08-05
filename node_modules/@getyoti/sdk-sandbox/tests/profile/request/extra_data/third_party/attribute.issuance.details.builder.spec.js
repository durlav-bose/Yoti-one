const { SandboxAttributeIssuanceDetailsBuilder } = require('../../../../..');
const Definition = require('../../../../../src/profile/request/extra_data/third_party/definition');
const SandboxAttributeIssuanceDetails = require('../../../../../src/profile/request/extra_data/third_party/attribute.issuance.details');

const TYPE_THIRD_PARTY_ATTRIBUTE = 'THIRD_PARTY_ATTRIBUTE';
const SOME_DEFINITION = 'some-definition';
const SOME_OTHER_DEFINITION = 'some-other-definition';
const SOME_TOKEN = 'some-token';
const SOME_DATE = new Date();

describe('SandboxAttributeIssuanceDetailsBuilder', () => {
  it('should build SandboxAttributeIssuanceDetails', () => {
    const sandboxAttributeIssuanceDetails = new SandboxAttributeIssuanceDetailsBuilder()
      .withDefinition(SOME_DEFINITION)
      .withDefinition(SOME_OTHER_DEFINITION)
      .withExpiryDate(SOME_DATE)
      .withIssuanceToken(SOME_TOKEN)
      .build();

    expect(sandboxAttributeIssuanceDetails).toBeInstanceOf(SandboxAttributeIssuanceDetails);

    expect(JSON.stringify(sandboxAttributeIssuanceDetails))
      .toEqual(JSON.stringify({
        type: TYPE_THIRD_PARTY_ATTRIBUTE,
        value: {
          issuance_token: SOME_TOKEN,
          issuing_attributes: {
            expiry_date: SOME_DATE.toISOString(),
            definitions: [
              new Definition(SOME_DEFINITION),
              new Definition(SOME_OTHER_DEFINITION),
            ],
          },
        },
      }));
  });
});
