var systemSettings = new Conviva.SystemSettings();
var systemInterface = new Html5SystemInterfaceFactory().build();
var systemFactory = new Conviva.SystemFactory(systemInterface, systemSettings);

//Customer integration
var clientSettings = new Conviva.ClientSettings(configs.CUSTOMER_KEY);
if (configs.gatewayUrl != undefined) {
    clientSettings.gatewayUrl = configs.gatewayUrl;
}

var client = new Conviva.Client(clientSettings, systemFactory);

var playerStateManager = client.getPlayerStateManager();

//Create metadata
var contentMetadata = new Conviva.ContentMetadata();
contentMetadata.assetName = configs.assetName;
contentMetadata.streamUrl = configs.url;
contentMetadata.streamType = configs.live ? Conviva.ContentMetadata.StreamType.LIVE : Conviva.ContentMetadata.StreamType.VOD;
contentMetadata.defaultBitrateKbps = Math.floor(configs.bitrateBps / 1000); // in Kbps
contentMetadata.applicationName = configs.applicationName;
contentMetadata.viewerId = configs.viewerId;

// Create a Conviva monitoring session.
var sessionKey = client.createSession(contentMetadata);
var html5PlayerInterface = new Html5PlayerInterface(playerStateManager, videoElement);

// sessionKey was obtained as shown above
client.attachPlayer(sessionKey, playerStateManager);

videoElement.addEventListener('error',function() {
	cleanupSession();
});
videoElement.addEventListener('ended',function() {
	cleanupSession();
});
function cleanupSession() {
    client.cleanupSession(sessionKey);
}