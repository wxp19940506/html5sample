var videoElement = document.getElementById('videoPlayer');
var streamUrl = configs.url;

if(streamUrl.indexOf('.m3u8') > -1) {
	var hls = new Hls();
	hls.loadSource(streamUrl);
	hls.attachMedia(videoElement);
	hls.on(Hls.Events.MANIFEST_PARSED,function() {
		videoElement.play();
	});
	// videoElement.src = streamUrl;
	// videoElement.play();
} 
//If Smooth streaming, use SS implementation of html5 MSE (hasplayer.js)
else if(streamUrl.indexOf('.ism') > -1) {
	var stream = {
		url: streamUrl
	};
	var mediaPlayer = new MediaPlayer();
	mediaPlayer.init(videoElement);
	mediaPlayer.load(stream);
}
//If Dash, use dash implementation of html5 MSE (dash.all.min.js)
else if(streamUrl.indexOf('.mpd') > -1) {
	var player = dashjs.MediaPlayer().create();
	player.initialize(videoElement, streamUrl, true);
} 
//If MP4, use the default way
else if(streamUrl.indexOf('.mp4') > -1) {
	videoElement.src = streamUrl;
	videoElement.play();
}