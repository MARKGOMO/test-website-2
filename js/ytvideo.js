// Load the YouTube Player API asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Global variable to store the YouTube player instance
var player;

// Function called by YouTube API when it's ready
function onYouTubePlayerAPIReady() {
  // Create a new instance of the YouTube player
  player = new YT.Player('youtube-player', {
    height: '400',
    width: '100%',
    videoId: 'K_HYpenM8_8',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

// Function called when the player state changes
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    // Pause the video when it's playing
    pauseVideoWhenOutOfView();
  }
}

// Pause the video when it's out of view
function pauseVideoWhenOutOfView() {
  var videoElement = document.getElementById('youtube-player');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // If the video is intersecting the viewport, play it
        player.playVideo();
      } else {
        // If the video is not intersecting the viewport, pause it
        player.pauseVideo();
      }
    });
  });

  observer.observe(videoElement);
}
