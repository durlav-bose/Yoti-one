const SandboxDefinition = require('../../../../../src/profile/request/extra_data/third_party/definition');

const SOME_NAME = 'some-name';

describe('SandboxDefintion', () => {
  it('should serialise to JSON', () => {
    const definition = new SandboxDefinition(SOME_NAME);

    expect(JSON.stringify(definition))
      .toEqual(JSON.stringify({
        name: SOME_NAME,
      }));
  });
});
