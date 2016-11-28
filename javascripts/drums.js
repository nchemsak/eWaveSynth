'use strict';
var AudioContext;
var onError;
var context = new AudioContext();

var songBuffer = null;

//for multiple browser support
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
function loadSong(url) { // the url can be full path or relative
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      songBuffer = buffer;
    }, onError);
  };
  request.send();
}
