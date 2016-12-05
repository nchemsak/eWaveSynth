'use strict';

/****************************************************************
                         audio mode?
******************************************************************/

var audio_file;
var audio_player;
var context = new AudioContext();

var audio = new Audio();
audio.src = '/audio/All%20the%20Same.wav';
audio.controls = true;
audio.volume = 1;
document.body.appendChild(audio);


/****************************************************************
                         AUDIO BUFFER
******************************************************************/
//audioBuffer 1
// External sounds (i.e., audio files) must be loaded into the app in preparation for playing. The storage location used for the audio is an AudioBuffer

var myAudioBuffer = null;
// That's all we have to do; the buffer is now defined and ready to receive audio data.

var url = '/audio/All%20the%20Same.wav';
window.onload = function() {
  // this gets the audio on the window load
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  // The file MUST be decoded.  below decodes the audio
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      myAudioBuffer = buffer;
    });
  };
  request.send();
};


var source = null;

function playSound(anybuffer) {
  source = context.createBufferSource();
  source.buffer = anybuffer;

  // DELAY NODE
  var delay = context.createDelay();
  delay.delayTime.value = 0.1;
  source.connect(delay);
  delay.connect(context.destination);
  source.connect(context.destination);


  source.connect(context.destination);
  // source.start();
  source.playbackRate.value = 0.75; //use playbackrate to change speed.

  source.start(context.currentTime + 0, 38, 2);
  //these 3 numbers mean, start the song after pausing x seconds, start x seconds into the song, and stop after playing it after x seconds)
  // source.noteOn(0); //see note in Step 6
}

function stopSound() {
  if (source) {
    source.stop();
    //source.noteOff(0); //see note in Step 6 text
  }
}

/****************************************************************
                         AUDIO BUFFER 2 method
******************************************************************/

function playSound2() {
  // window.onload = function() {
  // this gets the audio
  var request = new XMLHttpRequest();
  request.open('GET', '/audio/All%20the%20Same.wav', true);
  request.responseType = 'arraybuffer';
  // The file MUST be decoded.  below decodes the audio
  request.onload = function() {
    context.decodeAudioData(request.response, onDecoded);

  };

  function onDecoded(buffer) {
    var bufferSource = context.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(context.destination);
    bufferSource.playbackRate.value = 1; //use playbackrate to change speed.
    bufferSource.start(context.currentTime + 0, 38, 2);
  }
  request.send();
}
