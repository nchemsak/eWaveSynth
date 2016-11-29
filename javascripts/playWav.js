'use strict';
var AudioContext;
var audio_file;
var audio_player;

var context = new AudioContext();

var audio = new Audio();
// audio.src = 'All%20the%20Same.wav';
audio.src = '/audio/All%20the%20Same.wav';
audio.controls = true;
audio.volume = 1;
document.body.appendChild(audio);


var analyser = context.createAnalyser();

window.addEventListener('load', function(e) {
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
}, false);


// audio_file.onchange = function() {
//   var files = this.files;
//   var file = URL.createObjectURL(files[0]);
//   console.log("file: ", file);
//   audio_player.src = file;
//   audio_player.play();
// };
