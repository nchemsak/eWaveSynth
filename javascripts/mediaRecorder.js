'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var soundClips = document.querySelector('.sound-clips');

if (navigator.getUserMedia) {
  console.log('getUserMedia supported.');
  navigator.getUserMedia(
    // constraints - only audio needed for this app
    {
      audio: true
    },

    // Success callback
    function(stream) {


    },

    // Error callback
    function(err) {
      console.log('The following gUM error occured: ' + err);
    }
  );
} else {
  console.log('getUserMedia not supported on your browser!');
}
