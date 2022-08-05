const express = require("express");
const app = express();

const {
  DocScanClient,
  SessionSpecificationBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedLivenessCheckBuilder,
  RequestedTextExtractionTaskBuilder,
  RequestedFaceMatchCheckBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  OrthogonalRestrictionsFilterBuilder,
  RequestedIdDocumentComparisonCheckBuilder,
  RequestedThirdPartyIdentityCheckBuilder,
  RequestedWatchlistScreeningCheckBuilder,
  RequestedWatchlistAdvancedCaCheckBuilder,
  RequestedYotiAccountWatchlistAdvancedCaConfigBuilder,
  RequestedFuzzyMatchingStrategyBuilder,
  RequestedTypeListSourcesBuilder,
  RequiredSupplementaryDocumentBuilder,
  ProofOfAddressObjectiveBuilder,
  RequestedSupplementaryDocTextExtractionTaskBuilder,
} = require('yoti');

const fs = require("fs");

const SANDBOX_CLIENT_SDK_ID = '47045794-6514-434e-bd00-9e18f22d67fa';
const PEM = fs.readFileSync('sandbox/privateKey.pem', 'utf8');

async function createSession() {
  const docScanClient = new DocScanClient(
    SANDBOX_CLIENT_SDK_ID,
    PEM
  );
  
  console.log('docScanClient :>> ', docScanClient);

  const yotiAccountWatchListAdvancedCaConfig =
      new RequestedYotiAccountWatchlistAdvancedCaConfigBuilder()
        .withRemoveDeceased(true)
        .withShareUrl(true)
        .withSources(new RequestedTypeListSourcesBuilder()
          .withTypes(['pep', 'fitness-probity', 'warning'])
          .build())
        .withMatchingStrategy(new RequestedFuzzyMatchingStrategyBuilder()
          .withFuzziness(0.5)
          .build())
        .build();

    console.log('yotiAccountWatchListAdvancedCaConfig :>> ', yotiAccountWatchListAdvancedCaConfig);

    const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600)
    .withResourcesTtl(90000)
    .withUserTrackingId('user-one')
    .withRequestedCheck(
      new RequestedDocumentAuthenticityCheckBuilder()
        .withManualCheckAlways()
        .build()
    )
    .withRequestedCheck(
      new RequestedLivenessCheckBuilder()
        .forZoomLiveness()
        .build()
    )
    .withRequestedCheck(
      new RequestedFaceMatchCheckBuilder()
        .withManualCheckNever()
        .build()
    )
    .withRequestedCheck(
      new RequestedIdDocumentComparisonCheckBuilder()
        .build()
    )
    .withRequestedCheck(
      new RequestedThirdPartyIdentityCheckBuilder()
        .build()
    )
    .withRequestedCheck(
      new RequestedWatchlistScreeningCheckBuilder()
        .withAdverseMediaCategory()
        .withSanctionsCategory()
        .build()
    )
    .withRequestedCheck(
      new RequestedWatchlistAdvancedCaCheckBuilder()
        .withConfig(yotiAccountWatchListAdvancedCaConfig)
        .build()
    )
    .withRequestedTask(
      new RequestedTextExtractionTaskBuilder()
        .withManualCheckAlways()
        .withChipDataDesired()
        .build()
    )
    .withRequestedTask(
      new RequestedSupplementaryDocTextExtractionTaskBuilder()
        .withManualCheckAlways()
        .build()
    )
    .withSdkConfig(
      new SdkConfigBuilder()
        .withAllowsCameraAndUpload()
        .withPrimaryColour('#2d9fff')
        .withSecondaryColour('#FFFFFF')
        .withFontColour('#FFFFFF')
        .withLocale('en-GB')
        .withPresetIssuingCountry('GBR')
        .withSuccessUrl("https://api.yoti.com/sandbox/idverify/v1/success")
        .withErrorUrl("https://api.yoti.com/sandbox/idverify/v1/error")
        .withPrivacyPolicyUrl("https://api.yoti.com/sandbox/idverify/v1/privacy-policy")
        .withAllowHandoff(true)
        .withIdDocumentTextExtractionGenericRetries(5)
        .withIdDocumentTextExtractionReclassificationRetries(5)
        .build()
    )
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder())
        .withFilter(
          (new OrthogonalRestrictionsFilterBuilder())
            .withWhitelistedDocumentTypes(['PASSPORT'])
            .build()
        )
        .build()
    )
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder()).build()
    )
    .withRequiredDocument(
      (new RequiredSupplementaryDocumentBuilder())
        .withObjective(
          (new ProofOfAddressObjectiveBuilder()).build()
        )
        .build()
    )
    .build();
          console.log('sessionSpec :>> ', sessionSpec);
  return docScanClient.createSession(sessionSpec);
}



  var PORT = 4000;
  
  app.get('/', async (req, res) => {
    try {
      const session  = await createSession();
      res.send({"res": session});
    } catch (error) {
      res.send({"status": "erre"});
    }
  })
    
  app.listen(PORT, function(err){
      if (err) console.log(err);
      console.log("Server listening on PORT", PORT);
  }); 

