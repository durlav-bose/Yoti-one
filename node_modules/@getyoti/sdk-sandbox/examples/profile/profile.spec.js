require('dotenv').config();

const {
  Client,
  YotiDate,
} = require('yoti');

const {
  SandboxProfileClientBuilder,
  SandboxAgeVerificationBuilder,
  SandboxAnchorBuilder,
  SandboxExtraDataBuilder,
  SandboxAttributeIssuanceDetailsBuilder,
  SandboxDocumentImagesBuilder,
  TokenRequestBuilder,
} = require('@getyoti/sdk-sandbox');

const fs = require('fs');

const config = {
  SANDBOX_CLIENT_SDK_ID: process.env.YOTI_SANDBOX_CLIENT_SDK_ID,
  PEM: fs.readFileSync(process.env.YOTI_KEY_FILE_PATH, 'utf8'),
};

describe('Sandbox Example', () => {
  it('should return a user profile', async () => {
    const anchors = [
      new SandboxAnchorBuilder()
        .withType('SOURCE')
        .withSubType('')
        .withTimestamp(YotiDate.fromDateString('2020-01-01T00:00:00Z'))
        .withValue('PASSPORT')
        .build(),
      new SandboxAnchorBuilder()
        .withType('VERIFIER')
        .withSubType('')
        .withTimestamp(YotiDate.fromDateString('2020-01-01T00:00:00Z'))
        .withValue('YOTI_ADMIN')
        .build(),
    ];

    const ageVerification = new SandboxAgeVerificationBuilder()
      .withDateOfBirthString('1980-01-02')
      .withAgeOver(18)
      .build();

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);

    const dataEntry = new SandboxAttributeIssuanceDetailsBuilder()
      .withIssuanceToken('some-token')
      .withDefinition('some-definition')
      .withExpiryDate(expiryDate)
      .build();

    const extraData = new SandboxExtraDataBuilder()
      .withDataEntry(dataEntry)
      .build();

    const documentImages = new SandboxDocumentImagesBuilder()
      .withJpegContent(Buffer.from('some-jpeg'))
      .withPngContent(Buffer.from('some-png'))
      .build();

    const tokenRequest = new TokenRequestBuilder()
      .withRememberMeId('Some Remember Me ID')
      .withGivenNames('Some Given Names', anchors)
      .withFamilyName('Some Family Name', anchors)
      .withFullName('Some Full Name', anchors)
      .withDateOfBirthString('1980-01-02', anchors)
      .withGender('Some Gender', anchors)
      .withPhoneNumber('Some Phone Number')
      .withNationality('Some Nationality', anchors)
      .withEmailAddress('some@email.address')
      .withAgeVerification(ageVerification)
      .withStructuredPostalAddress(JSON.stringify({
        building_number: 1,
        address_line1: 'Some Address',
      }))
      .withBase64Selfie(Buffer.from('Some Selfie').toString('base64'))
      .withDocumentDetails('PASSPORT USA 1234abc', anchors)
      .withDocumentImages(documentImages, anchors)
      .withExtraData(extraData)
      .build();

    const sandboxProfileClient = new SandboxProfileClientBuilder()
      .withClientSdkId(config.SANDBOX_CLIENT_SDK_ID)
      .withPemString(config.PEM)
      .build();

    const tokenResponse = await sandboxProfileClient.setupSharingProfile(tokenRequest);
    const token = tokenResponse.getToken();

    const yotiClient = new Client(
      config.SANDBOX_CLIENT_SDK_ID,
      config.PEM
    );

    const activityDetails = await yotiClient.getActivityDetails(token);
    const profile = activityDetails.getProfile();

    expect(Buffer.from(activityDetails.getRememberMeId(), 'base64').toString())
      .toBe('Some Remember Me ID');

    expect(profile.getGivenNames().getValue()).toEqual('Some Given Names');
    expect(profile.getFamilyName().getValue()).toEqual('Some Family Name');
    expect(profile.getFullName().getValue()).toEqual('Some Full Name');
    expect(profile.getDateOfBirth().getValue()).toEqual('1980-01-02');
    expect(profile.getGender().getValue()).toEqual('Some Gender');
    expect(profile.getPhoneNumber().getValue()).toEqual('Some Phone Number');
    expect(profile.getNationality().getValue()).toEqual('Some Nationality');
    expect(profile.getEmailAddress().getValue()).toEqual('some@email.address');
    expect(profile.findAgeOverVerification(18).getResult()).toEqual(true);

    expect(profile.getStructuredPostalAddress().getValue())
      .toEqual({
        building_number: 1,
        address_line1: 'Some Address',
      });

    expect(profile.getDocumentImages().getValue()).toHaveLength(2);

    expect(profile.getSelfie().getValue().getContent().toBuffer())
      .toEqual(Buffer.from('Some Selfie'));

    const documentDetails = profile.getDocumentDetails().getValue();
    expect(documentDetails.getType())
      .toEqual('PASSPORT');
    expect(documentDetails.getIssuingCountry())
      .toEqual('USA');
    expect(documentDetails.getDocumentNumber())
      .toEqual('1234abc');

    expect(profile.getGivenNames().getSources()[0].getValue())
      .toEqual('PASSPORT');
    expect(profile.getGivenNames().getVerifiers()[0].getValue())
      .toEqual('YOTI_ADMIN');

    const attributeIssuanceDetails = activityDetails.getExtraData().getAttributeIssuanceDetails();
    expect(attributeIssuanceDetails.getToken())
      .toEqual(Buffer.from('some-token').toString('base64'));
    expect(attributeIssuanceDetails.getExpiryDate().getTime())
      .toEqual(expiryDate.getTime());
    expect(attributeIssuanceDetails.getIssuingAttributes()[0].getName())
      .toEqual('some-definition');
  });
});
